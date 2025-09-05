# ManagedNamespace API Reference

## Resource Definition

The ManagedNamespace XR (Composite Resource) provides a high-level API for namespace management.

### API Version

- **Group**: `openportal.dev`
- **Version**: `v1alpha1`
- **Kind**: `ManagedNamespace`

## Specification

### Full Schema

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: <resource-name>
spec:
  namespace: <string>           # Required: The namespace name to create
  owner: <string>               # Optional: Email of the namespace owner
  purpose: <string>             # Optional: Description of namespace purpose
  environment: <string>         # Optional: Environment (dev, staging, prod)
  
  resourceQuota:                # Optional: Resource quota configuration
    requests.cpu: <string>
    requests.memory: <string>
    limits.cpu: <string>
    limits.memory: <string>
    persistentvolumeclaims: <string>
    requests.storage: <string>
    
  limitRange:                   # Optional: Limit range configuration
    default:
      cpu: <string>
      memory: <string>
    defaultRequest:
      cpu: <string>
      memory: <string>
    max:
      cpu: <string>
      memory: <string>
    min:
      cpu: <string>
      memory: <string>
      
  rbac:                        # Optional: RBAC configuration
    admins: []                 # List of admin users/groups
    editors: []                # List of editor users/groups
    viewers: []                # List of viewer users/groups
    
  labels: {}                   # Optional: Additional labels
  annotations: {}              # Optional: Additional annotations
```

## Field Descriptions

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `spec.namespace` | string | The name of the Kubernetes namespace to create. Must be a valid DNS label. |

### Optional Fields

#### Basic Configuration

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `spec.owner` | string | Email address of the namespace owner | - |
| `spec.purpose` | string | Human-readable description of the namespace purpose | - |
| `spec.environment` | string | Environment designation (dev, staging, prod) | - |

#### Resource Management

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `spec.resourceQuota.requests.cpu` | string | Total CPU requests allowed | "10" |
| `spec.resourceQuota.requests.memory` | string | Total memory requests allowed | "20Gi" |
| `spec.resourceQuota.limits.cpu` | string | Total CPU limits allowed | "20" |
| `spec.resourceQuota.limits.memory` | string | Total memory limits allowed | "40Gi" |
| `spec.resourceQuota.persistentvolumeclaims` | string | Number of PVCs allowed | "10" |
| `spec.resourceQuota.requests.storage` | string | Total storage requests | "100Gi" |

#### Limit Ranges

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `spec.limitRange.default.cpu` | string | Default CPU limit for containers | "500m" |
| `spec.limitRange.default.memory` | string | Default memory limit | "1Gi" |
| `spec.limitRange.defaultRequest.cpu` | string | Default CPU request | "100m" |
| `spec.limitRange.defaultRequest.memory` | string | Default memory request | "128Mi" |
| `spec.limitRange.max.cpu` | string | Maximum CPU per container | "2" |
| `spec.limitRange.max.memory` | string | Maximum memory per container | "4Gi" |

#### RBAC Configuration

| Field | Type | Description |
|-------|------|-------------|
| `spec.rbac.admins` | []string | Users/groups with admin role |
| `spec.rbac.editors` | []string | Users/groups with edit role |
| `spec.rbac.viewers` | []string | Users/groups with view role |

#### Metadata

| Field | Type | Description |
|-------|------|-------------|
| `spec.labels` | map[string]string | Additional labels for the namespace |
| `spec.annotations` | map[string]string | Additional annotations for the namespace |

## Status Fields

The ManagedNamespace controller populates the following status fields:

```yaml
status:
  conditions:
    - type: Ready
      status: "True"
      reason: Available
      lastTransitionTime: <timestamp>
    - type: Synced
      status: "True"
      reason: ReconcileSuccess
      lastTransitionTime: <timestamp>
  
  namespaceReady: true
  resourceQuotaReady: true
  rbacReady: true
```

## Examples

### Minimal Configuration

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: simple-namespace
spec:
  namespace: my-app
```

### Full Configuration

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: production-app
spec:
  namespace: prod-application
  owner: platform-team@company.com
  purpose: "Production environment for main application"
  environment: production
  
  resourceQuota:
    requests.cpu: "20"
    requests.memory: "40Gi"
    limits.cpu: "40"
    limits.memory: "80Gi"
    persistentvolumeclaims: "20"
    requests.storage: "500Gi"
    
  limitRange:
    default:
      cpu: "1"
      memory: "2Gi"
    defaultRequest:
      cpu: "200m"
      memory: "256Mi"
    max:
      cpu: "4"
      memory: "8Gi"
    min:
      cpu: "50m"
      memory: "64Mi"
      
  rbac:
    admins:
      - platform-admins@company.com
    editors:
      - dev-team@company.com
      - ci-service-account
    viewers:
      - auditors@company.com
      - monitoring-system
      
  labels:
    cost-center: engineering
    team: platform
    criticality: high
    
  annotations:
    company.com/contact: platform-team@company.com
    company.com/documentation: https://wiki.company.com/platform
```

## Validation Rules

1. **Namespace name** must:
   - Be a valid DNS label (lowercase, alphanumeric, hyphens)
   - Be between 1 and 63 characters
   - Not start or end with a hyphen

2. **Resource values** must:
   - Follow Kubernetes quantity format (e.g., "1", "100m", "1Gi")
   - Be positive values

3. **RBAC subjects** must:
   - Be valid email addresses or group names
   - Follow the identity provider's format

## Composition Behavior

When you create a ManagedNamespace, the composition creates:

1. **Kubernetes Namespace** - The actual namespace resource
2. **ResourceQuota** - If resource quota is specified
3. **LimitRange** - If limit range is specified
4. **RoleBindings** - For each RBAC tier specified
5. **ServiceAccount** - Default service account for the namespace
6. **NetworkPolicy** - Default network policies (if enabled)

## Deletion Behavior

When a ManagedNamespace is deleted:

1. All composed resources are deleted
2. The Kubernetes namespace and all its contents are removed
3. RBAC bindings are cleaned up
4. Resource quotas and limit ranges are removed

!!! warning "Data Loss"
    Deleting a ManagedNamespace will delete the Kubernetes namespace and **all resources within it**. This action cannot be undone.