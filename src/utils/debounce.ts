// debounce function
export function debounce(callback: TimerHandler, timeout: number): TimerHandler {
  let timer = null;
  if (timer) clearInterval(timer);
  return () => {
    timer = setTimeout(callback, timeout);
  };
}
