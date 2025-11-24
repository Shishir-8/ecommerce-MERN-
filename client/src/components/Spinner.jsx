// components/Spinner.jsx
export default function Spinner({ size = "6" }) {
  return (
    <div
      className={`border-2 border-t-2 border-gray-200 border-t-blue-600 rounded-full w-${size} h-${size} animate-spin mx-auto`}
    ></div>
  );
}