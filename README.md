# Namespace Template

Crossplane template for Kubernetes namespace management with resource quotas, network policies, and RBAC.

## Overview

This template provides a comprehensive namespace provisioning solution that includes:
- Namespace creation with custom labels and annotations
- Optional resource quotas for cost control
- Optional network policies for security
- Team-based RBAC configuration
- Default service account setup

## Components

- **xrd.yaml** - Defines the `Namespace` custom resource API
- **composition.yaml** - Implements namespace creation using composition functions
- **examples/** - Sample configurations for different use cases

## Usage

### Basic Namespace

```yaml
apiVersion: openportal.dev/v1alpha1
kind: Namespace
metadata:
  name: my-namespace
  namespace: default  # Can be created in any namespace
spec:
  name: my-namespace
  team: my-team
  environment: dev
```

### Namespace with Resource Quotas

```yaml
apiVersion: openportal.dev/v1alpha1
kind: Namespace
metadata:
  name: staging-app
spec:
  name: staging-app
  team: app-team
  environment: staging
  quotas:
    enabled: true
    limits:
      cpu: "20"
      memory: "32Gi"
      storage: "200Gi"
```

### Namespace with Network Isolation

```yaml
apiVersion: openportal.dev/v1alpha1
kind: Namespace
metadata:
  name: prod-secure
spec:
  name: prod-secure
  team: security-team
  environment: production
  networkPolicies:
    enabled: true
    allowNamespaces:
      - monitoring
      - logging
```

## Features

### Resource Quotas
When enabled, creates a `ResourceQuota` that limits:
- CPU usage
- Memory consumption
- Storage requests
- Number of PVCs, LoadBalancers, and NodePorts

### Network Policies
When enabled, creates a default deny `NetworkPolicy` that:
- Blocks all ingress by default
- Allows traffic from same namespace
- Allows traffic from specified namespaces
- Always permits ingress-nginx access
- Allows all egress (configurable)

### RBAC
Automatically creates:
- Default service account
- RoleBinding granting admin access to the specified team

## Installation

Apply via the catalog repository or directly:

```bash
kubectl apply -f xrd.yaml
kubectl apply -f composition.yaml
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | required | Namespace name (DNS-1123) |
| `team` | string | platform-team | Team that owns the namespace |
| `environment` | string | dev | Environment type (dev/staging/production) |
| `labels` | object | {} | Additional labels for the namespace |
| `annotations` | object | {} | Additional annotations |
| `quotas.enabled` | boolean | false | Enable resource quotas |
| `quotas.limits.cpu` | string | "10" | CPU limit |
| `quotas.limits.memory` | string | "10Gi" | Memory limit |
| `quotas.limits.storage` | string | "100Gi" | Storage limit |
| `networkPolicies.enabled` | boolean | false | Enable network policies |
| `networkPolicies.allowNamespaces` | array | [] | Namespaces to allow traffic from |

## Restaurant Analogy

Think of this template as **reserving a private dining room**:
- The namespace is your dedicated space
- Resource quotas are like table limits (max guests, orders)
- Network policies are like access control (who can enter)
- RBAC is like giving your team the keys
- Labels/annotations are like room decorations and signs