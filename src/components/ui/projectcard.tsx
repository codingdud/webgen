import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

interface Image {
  metadata: {
    type: string;
    prompt: string;
    style: string;
    colorScheme: string[];
    aspectRatio: string;
  };
  _id: string;
  url: string;
  publicId: string;
  user: string;
  generatedAt: string;
  __v: number;
}
interface ProjectCardProps {
  _id: string;
  title: string;
  description: string;
  user: string;
  images: Image[];
  tags: string[];
  status: "draft" | "in-progress" | "completed";
  createdAt: string;
  updatedAt: string;
}
const statusColors = {
  draft: "bg-yellow-500",
  "in-progress": "bg-blue-500",
  completed: "bg-green-500",
};

const ProjectCard: React.FC<ProjectCardProps> = ({ _id,title, description, images, tags, status, updatedAt }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div 
      className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
    >
      <div 
      className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 dark:bg-neutral-700"
      onClick={() => navigate(`/project/${_id}`)}
      >
        {images.length > 0 ? (
          <img src={images[0]?.url} alt={title} className="h-full w-full object-cover" />
        ) : (
          <p>600 × 400</p>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center space-x-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <span className={`inline-block px-2 py-1 text-white text-xs font-medium rounded ${statusColors[status]}`}>{status}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">Last updated: {formatDistanceToNow(new Date(updatedAt))} ago</p>
          <button onClick={() => setIsExpanded(!isExpanded)} className="focus:outline-none">
              {isExpanded ? <IconChevronDown className="w-5 h-5" /> : <IconChevronUp className="w-5 h-5" />}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
