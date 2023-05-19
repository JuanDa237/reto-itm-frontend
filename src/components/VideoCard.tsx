import { getFilePath } from "../api/common.api";

interface VideoCardProps {
  title: string;
  filePath: string;
}

function VideoCard(props: VideoCardProps) {
  return (
    <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
      <div className="py-3 px-6 mb-0 bg-gray-200 border-b-1 border-gray-300 text-gray-900">
        <h3 className="m-0">{props.title}</h3>
      </div>
      <div className="flex-auto p-6">
        <video controls>
          <source src={getFilePath(props.filePath)} />
          Tu navegador no soporta la reproduccion de este video.
        </video>
      </div>
    </div>
  );
}

export default VideoCard;
