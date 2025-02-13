from typing import List, Dict, Set
import networkx as nx
import sys
sys.path.append('.')
from schemas.task import Task

def create_dependency_dag(tasks: List[Task]) -> nx.DiGraph:
    """
    Creates a Directed Acyclic Graph (DAG) from a list of tasks based on their dependencies.
    
    Args:
        tasks: List of Task objects
    
    Returns:
        nx.DiGraph: A NetworkX directed graph representing the task dependencies
        
    Raises:
        ValueError: If there are circular dependencies in the tasks
    """
    # Create a mapping of task IDs to tasks for easier lookup
    task_map: Dict[str, Task] = {task.id: task for task in tasks}
    
    # Create a directed graph
    dag = nx.DiGraph()
    
    # Add all tasks as nodes first
    for task in tasks:
        dag.add_node(task.id, task=task)
    
    # Add edges based on dependencies
    for task in tasks:
        # Add edges from each dependency to this task
        for dep_id in task.depends_on:
            if dep_id not in task_map:
                raise ValueError(f"Task {task.id} depends on non-existent task {dep_id}")
            dag.add_edge(dep_id, task.id)
    
    # Check for cycles
    if not nx.is_directed_acyclic_graph(dag):
        cycles = list(nx.simple_cycles(dag))
        raise ValueError(f"Circular dependencies detected in tasks: {cycles}")
    
    return dag

def get_critical_path(dag: nx.DiGraph) -> List[str]:
    """
    Identifies the critical path in the task dependency DAG.
    The critical path is the longest path through the DAG based on task estimates.
    
    Args:
        dag: NetworkX DiGraph representing the task dependencies
        
    Returns:
        List[str]: List of task IDs representing the critical path
    """
    # Add weights to edges based on the target node's estimated hours
    weighted_dag = dag.copy()
    for node in weighted_dag.nodes():
        task = weighted_dag.nodes[node]['task']
        for successor in weighted_dag.successors(node):
            weighted_dag[node][successor]['weight'] = -task.estimate.hours
    
    # Find the longest path (most negative weight path)
    # First, find all paths from nodes with no predecessors to nodes with no successors
    start_nodes = [n for n in weighted_dag.nodes() if weighted_dag.in_degree(n) == 0]
    end_nodes = [n for n in weighted_dag.nodes() if weighted_dag.out_degree(n) == 0]
    
    critical_path = []
    max_length = float('-inf')
    
    for start in start_nodes:
        for end in end_nodes:
            try:
                paths = list(nx.all_simple_paths(weighted_dag, start, end))
                for path in paths:
                    length = sum(weighted_dag[path[i]][path[i+1]]['weight'] 
                               for i in range(len(path)-1))
                    if length < max_length:  # Remember we're using negative weights
                        max_length = length
                        critical_path = path
            except nx.NetworkXNoPath:
                continue
    
    return critical_path

def get_topological_sort(dag: nx.DiGraph) -> List[str]:
    """
    Returns a topological sorting of the tasks in the DAG.
    A topological sort is a linear ordering of vertices such that for every directed edge u->v, 
    vertex u comes before v in the ordering.
    
    Args:
        dag: NetworkX DiGraph representing the task dependencies
        
    Returns:
        List[str]: List of task IDs in topological order
        
    Raises:
        NetworkXUnfeasible: If the graph contains cycles
    """
    try:
        # NetworkX's topological_sort returns an iterator
        return list(nx.topological_sort(dag))
    except nx.NetworkXUnfeasible as e:
        # This shouldn't happen since we check for cycles when creating the DAG,
        # but we'll handle it just in case
        cycles = list(nx.simple_cycles(dag))
        raise ValueError(f"Cannot perform topological sort - graph contains cycles: {cycles}")
