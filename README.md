# OrionSense IOT HUB
![Dashboard](assets/orion_dashboard.png)

## About
OrionSenseHub is an IoT server developed with Django as the main backend and uses DRF for API endpoints. Provides SaaS(AI) and other services eg analytics.

Supports:
- Websockets
- API calls

Data ingestion and processing
- Real time telemetry streaming(websockets)
- Data storage and history
- Event triggers and alerts
- Edge Computing(Later integration)

SaaS services
- Predictive maintenance
- Anomaly detection
- Behavioral analytics
- Custom AI models

---


```bash
POST /api/projects/<project_id>/devices/<device_id>/data/
Authorization: Api-Key <project_api_key>
Content-Type: application/json

```
#### JSON Body Examples
```json
{
    "sensor_type":"Temperature",
    "value":25.7
}
```
```json
{
    "sensor_type":"Humidity",
    "value":25.7
}
```