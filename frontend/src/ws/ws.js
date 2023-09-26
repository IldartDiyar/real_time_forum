export const ws = () => {
    return new WebSocket('ws://localhost:8080/api/v1/ws');
}