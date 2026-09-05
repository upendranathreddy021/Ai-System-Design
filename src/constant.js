
import {
  Laptop, Globe, ShieldCheck, GitFork, DoorOpen, Server, Cog,
  Database, Zap, ListOrdered, Box, Search, BarChart3, Activity,
  ExternalLink, Cuboid, Cloud,
} from 'lucide-react';

export const API_BASE_URL="http://localhost:8081/api/system_design_ai"
export const LOCAL_BASE_URL="http://localhost:8081/api/system_design_ai"
export const LOCAL_BASE_URL_PYTHON="http://127.0.0.1:10000"
export const APIS={

    SIGNUP:{
        VERIFY_OTP:`${LOCAL_BASE_URL}/auth/verifyCode`, //post
        SEND_OTP:`${LOCAL_BASE_URL}/auth/sendCode`,  //post
        CREATE_ACCOUNT:`${LOCAL_BASE_URL}/auth/complete-registration`,  //post
        LOGIN:`${LOCAL_BASE_URL}/auth/login`

    },
    SYSTEM_DESIGN:{
      GENERATE:`${LOCAL_BASE_URL_PYTHON}/system-design/generate`,  //post
    }

}
// Global Application Types & Constants

export const ARCHITECTURE_STYLES = [
  {  label: 'Microservices' },
  {  label: 'Monolith' },
  {  label: 'Serverless' },
  { label: 'Event-Driven Architecture' },
];

export const CLOUD_TARGETS = [
  {  label: 'AWS (Amazon Web Services)' },
  {  label: 'Google Cloud Platform' },
  {  label: 'Microsoft Azure' },
  {  label: 'Cloud Agnostic' },
];

export const SCALE_TIERS = [
  {  label: 'Startup (<10k RPM)' },
  {label:'Growth (10K–1M users)'},
  {  label: 'Enterprise (1M–10M users)' },
  {  label: 'Hyperscale (10M+ users)' },
];

export const DATA_STORE_STRATEGIES = [
  {  label: 'SQL (relational)' },
  {  label: 'NoSQL (document/key-value)' },
  {  label: 'Hybrid (SQL + NoSQL)' },
  {label:'Cache-heavy (Redis/Memcached-first)'}
];

export const FRAMEWORKS = [
  {  label: 'Java / Spring Boot' },
  {  label: 'Python (Django/FastAPI)' },
  {  label: 'Node.js / Express / NestJS' },
  {label:".NET"},
  {  label: 'Go (Golang)' },
  {  label: 'Rust (Actix/Axum)' },
  {label:"Any (let AI decide)"}
];

export const   COMPONENT_MODULES=[
    {label:"Authentication / Authorization"},
    {label:"Payments"},
    {label:"Search"},
    {label:"Notifications (email/push/SMS)"},
    {label:"File storage / media"},
    {label:"Analytics / logging"},
    {label:"Real-time messaging (chat/websockets)"},
    {label:"Admin dashboard"},

]
export const NODE_TYPE_CONFIG = {
  client: { icon: Laptop, color: '#94a3b8' },
  cdn: { icon: Globe, color: '#6366f1' },
  waf: { icon: ShieldCheck, color: '#6366f1' },
  load_balancer: { icon: GitFork, color: '#6366f1' },
  gateway: { icon: DoorOpen, color: '#6366f1' },
  service: { icon: Server, color: '#14b8a6' },
  worker: { icon: Cog, color: '#14b8a6' },
  database: { icon: Database, color: '#a855f7' },
  cache: { icon: Zap, color: '#a855f7' },
  queue: { icon: ListOrdered, color: '#a855f7' },
  storage: { icon: Box, color: '#a855f7' },
  search: { icon: Search, color: '#a855f7' },
  analytics: { icon: BarChart3, color: '#f97316' },
  monitoring: { icon: Activity, color: '#f97316' },
  external: { icon: ExternalLink, color: '#94a3b8' },
  container: { icon: Cuboid, color: '#14b8a6' },
  serverless: { icon: Cloud, color: '#14b8a6' },
};