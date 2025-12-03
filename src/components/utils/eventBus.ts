// Event Bus simple para comunicación entre componentes
export const EventBus = {
  on(event: string, callback: Function) {
    document.addEventListener(event, (e: any) => callback(e.detail));
  },
  dispatch(event: string, data?: any) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: string, callback: Function) {
    document.removeEventListener(event, callback as EventListener);
  },
};