import { Alert } from "@material-tailwind/react";
 
export function Popup() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Alert color="blue">An info alert for showing message.</Alert>
    </div>
  );
}