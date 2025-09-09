# Mermaid Diagram Test Page

This page tests various mermaid diagram types to ensure the plugin is working correctly.

## Flow Chart

```mermaid
graph LR
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> A
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Backstage
    participant Crossplane
    participant Kubernetes
    
    User->>Backstage: Create ManagedNamespace
    Backstage->>Crossplane: Apply XR
    Crossplane->>Kubernetes: Create Namespace
    Kubernetes-->>Crossplane: Namespace Created
    Crossplane-->>Backstage: XR Ready
    Backstage-->>User: Success
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Creating: XR Applied
    Creating --> Ready: Resources Created
    Creating --> Failed: Error
    Failed --> Creating: Retry
    Ready --> [*]
```

## Gantt Chart

```mermaid
gantt
    title ManagedNamespace Deployment Timeline
    dateFormat  YYYY-MM-DD
    section Planning
    Design XRD           :done,    des1, 2024-01-01, 7d
    Create Composition   :done,    des2, after des1, 5d
    section Implementation
    Build Package        :active,  dev1, after des2, 3d
    Test in Cluster      :         dev2, after dev1, 5d
    section Deployment
    Release to Prod      :         dep1, after dev2, 2d
```

## Class Diagram

```mermaid
classDiagram
    class ManagedNamespace {
        +String name
        +String team
        +create()
        +delete()
    }
    class Namespace {
        +String name
        +Map labels
        +Map annotations
    }
    class Composition {
        +String version
        +render()
    }
    ManagedNamespace --> Composition : uses
    Composition --> Namespace : creates
```

## Pie Chart

```mermaid
pie title Resource Distribution
    "Namespaces" : 45
    "ConfigMaps" : 20
    "Secrets" : 15
    "Services" : 20
```