import {useParams} from "react-router";
const Meeting = () => {
    const params = useParams();
  return (
    <div>
      Meeting Room: #{params.id}
    </div>
  )
}

export default Meeting;
