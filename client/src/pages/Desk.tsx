import { TDesk } from "@/@types/schema";
import { getDesksById } from "api/desks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Desk() {
  const [desk, setDesk] = useState<TDesk[]>([]);
  const { deskId } = useParams();
  useEffect(() => {
    (async () => {
      const data = await getDesksById(deskId!);
      setDesk(data);
    })();
  }, []);

  return (
    <div>
      test
      <p>{desk.title}</p>
    </div>
  );
}
