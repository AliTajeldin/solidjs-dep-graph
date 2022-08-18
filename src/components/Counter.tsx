import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  return (
    <button
      class="w-[200px] rounded-full text-gray-400 bg-rose-800 border-rose-300  focus:border-yellow-400 focus-visible:outline-none border-4"
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count}
    </button>
  );
}
