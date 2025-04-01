export default function ConnectWallet() {
  return (
    <>
      <div className="w-max h-max">
        <div className="flex justify-center items-center p-4">
          <appkit-network-button />
        </div>
        <div className="flex justify-center items-center p-4">
          <appkit-button />
        </div>
      </div>
    </>
  );
}