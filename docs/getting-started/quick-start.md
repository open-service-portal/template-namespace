# Quick Start Guide

This guide will help you create your first ManagedNamespace in less than 5 minutes.

## Prerequisites

Before you begin, ensure you have:

- ✅ Kubernetes cluster (v1.28+)
- ✅ Crossplane installed (v1.17+)
- ✅ ManagedNamespace template installed
- ✅ kubectl configured

## Step 1: Create a Simple Namespace

Create a file named `my-namespace.yaml`:

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: my-team-namespace
spec:
  namespace: my-team
```

Apply the resource:

```bash
kubectl apply -f my-namespace.yaml
```

## Step 2: Verify Creation

Check the status of your ManagedNamespace:

```bash
# Check the XR status
kubectl get managednamespace my-team-namespace

# Check if the namespace was created
kubectl get namespace my-team

# View the composed resources
kubectl describe managednamespace my-team-namespace
```

## Step 3: Add Resource Quotas

Update your ManagedNamespace with resource limits:

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: my-team-namespace
spec:
  namespace: my-team
  owner: team-lead@company.com
  purpose: "Development environment"
  resourceQuota:
    requests.cpu: "4"
    requests.memory: "8Gi"
    limits.cpu: "8"
    limits.memory: "16Gi"
    persistentvolumeclaims: "10"
```

Apply the updated configuration:

```bash
kubectl apply -f my-namespace.yaml
```

## Step 4: Configure RBAC

Add team members with different roles:

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: my-team-namespace
spec:
  namespace: my-team
  owner: team-lead@company.com
  rbac:
    admins:
      - admin@company.com
    editors:
      - developer1@company.com
      - developer2@company.com
    viewers:
      - auditor@company.com
```

## Common Patterns

### Development Environment

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: dev-environment
spec:
  namespace: dev
  environment: development
  resourceQuota:
    requests.cpu: "2"
    requests.memory: "4Gi"
  labels:
    environment: dev
    cost-center: engineering
```

### Production Namespace

```yaml
apiVersion: openportal.dev/v1alpha1
kind: ManagedNamespace
metadata:
  name: prod-application
spec:
  namespace: production-app
  environment: production
  resourceQuota:
    requests.cpu: "10"
    requests.memory: "20Gi"
    limits.cpu: "20"
    limits.memory: "40Gi"
  labels:
    environment: prod
    criticality: high
    compliance: required
```

## Troubleshooting

### Namespace Not Created

Check the XR status:
```bash
kubectl get managednamespace my-team-namespace -o yaml
```

Look for conditions and events:
```bash
kubectl describe managednamespace my-team-namespace
```

### Resource Quota Not Applied

Verify the quota was created:
```bash
kubectl get resourcequota -n my-team
```

### RBAC Not Working

Check role bindings:
```bash
kubectl get rolebindings -n my-team
```

## Next Steps

- 📖 Learn about [RBAC configuration](../usage/rbac.md)
- 🔧 Explore [advanced configuration](../getting-started/configuration.md)
- 📊 Set up [resource quotas](../usage/resource-quotas.md)
- 🏷️ Understand [labels and annotations](../usage/labels-annotations.md)