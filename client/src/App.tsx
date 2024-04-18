import { useSocket } from "./hooks/useSocket";

function App() {
  const { isConnected, emit } = useSocket("http://localhost:3001", [
    {
      name: "server_message",
      handler: (data) => console.log("received server message: ", data),
    },
  ]);

  const emitMessage = () => {
    console.log("emitting message");
    emit("client_message", JSON.stringify({ message: "hello" }));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 p-8">
        <p className="bg-slate-300 px-4 py-2 rounded w-full text-center">
          {`State: ${isConnected}`}
        </p>
        <button onClick={emitMessage}>Emit event</button>
      </div>
    </>
  );
}

export default App;
