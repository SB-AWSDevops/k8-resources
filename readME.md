## Services in k8:
```
Kubernetes Services
├── Definition
│   ├── Abstracts access to a group of pods
│   ├── Provides stable network endpoints
│   ├── Facilitates load balancing
│   └── Supports service discovery
├── Types
│   ├── ClusterIP
│   │   ├── Default service type
│   │   ├── Internal access only
│   │   ├── Uses a virtual IP within the cluster
│   │   ├── Components
│   │   │   ├── kube-apiserver
│   │   │   │   ├── Receives service creation request
│   │   │   │   ├── Allocates a virtual IP (ClusterIP)
│   │   │   │   └── Updates etcd with service definition
│   │   │   ├── kube-proxy
│   │   │   │   ├── Watches for service updates
│   │   │   │   ├── Updates iptables rules or IPVS rules
│   │   │   │   └── Routes traffic to appropriate pod
│   │   │   └── CoreDNS
│   │   │       ├── Resolves service names to ClusterIP
│   │   │       └── Ensures service discovery
│   │   └── Workflow
│   │       ├── Client sends request to ClusterIP
│   │       ├── kube-proxy intercepts request
│   │       ├── kube-proxy routes traffic to a pod
│   │       └── Pod handles the request
│   ├── NodePort
│   │   ├── Exposes service on each Node's IP at a static port
│   │   ├── Accessible from outside the cluster
│   │   ├── Allocated port range (default: 30000-32767)
│   │   ├── Components
│   │   │   ├── kube-apiserver
│   │   │   │   ├── Receives service creation request
│   │   │   │   ├── Allocates NodePort
│   │   │   │   └── Updates etcd with service definition
│   │   │   ├── kube-proxy
│   │   │   │   ├── Watches for service updates
│   │   │   │   ├── Updates iptables rules or IPVS rules
│   │   │   │   └── Routes traffic to appropriate pod
│   │   │   └── CoreDNS
│   │   │       ├── Resolves service names to NodePort
│   │   │       └── Ensures service discovery
│   │   └── Workflow
│   │       ├── Client sends request to NodeIP:NodePort
│   │       ├── Node routes traffic to ClusterIP
│   │       ├── kube-proxy intercepts request
│   │       ├── kube-proxy routes traffic to a pod
│   │       └── Pod handles the request
│   └── LoadBalancer
│       ├── Integrates with external load balancer providers
│       ├── Exposes service externally using a cloud provider's load balancer
│       ├── Components
│       │   ├── kube-apiserver
│       │   │   ├── Receives service creation request
│       │   │   ├── Communicates with cloud provider API
│       │   │   ├── Allocates external IP
│       │   │   └── Updates etcd with service definition
│       │   ├── Cloud Provider
│       │   │   ├── Provisions load balancer
│       │   │   ├── Associates external IP with load balancer
│       │   │   └── Forwards traffic to NodePorts
│       │   ├── kube-proxy
│       │   │   ├── Watches for service updates
│       │   │   ├── Updates iptables rules or IPVS rules
│       │   │   └── Routes traffic to appropriate pod
│       │   └── CoreDNS
│       │       ├── Resolves service names to external IP
│       │       └── Ensures service discovery
│       └── Workflow
│           ├── Client sends request to external IP
│           ├── Cloud load balancer routes traffic to NodeIP:NodePort
│           ├── Node routes traffic to ClusterIP
│           ├── kube-proxy intercepts request
│           ├── kube-proxy routes traffic to a pod
│           └── Pod handles the request
