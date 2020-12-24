export async function wait(time: number = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
export function getValue(id: string) {
  return document.querySelector(`#${id}`)!.innerHTML;
}
