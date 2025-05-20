import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { IconChevronDown, IconChevronUp, IconThumbDown, IconThumbUp} from "@tabler/icons-react";
import { useState } from "react";
 import {motion} from "framer-motion";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {toggleLikeTemplate,toggleDislikeTemplate} from "../../store/Thunk/templateAction"

interface Image {
  _id: string;
  url: string;
  // ...other image fields if needed
}

interface TemplateCardProps {
  _id: string;
  project: {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    images: Image[];
    updatedAt: string;
  };
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  _id,
  project,
  likeCount,
  dislikeCount,
  createdAt,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state: RootState) => state.userState.user);
  const userId = user?._id;
  const email = user?.email;
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden cursor-pointer">
      <div
        className="h-48 bg-gray-200 flex items-center justify-center text-gray-500 dark:bg-neutral-700"
        onClick={() => navigate(`/templatedetails/${_id}`)}
      >
        {project.images && project.images.length > 0 ? (
          <img
            src={project.images[0].url}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <p>600 × 400</p>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center space-x-4">
          <h2 className="text-lg font-medium">{project.title}</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            publish {formatDistanceToNow(new Date(createdAt||project.updatedAt))} ago
          </p>
        </div>
        <div className="flex justify-between items-center space-x-4"></div>
        <div className="flex justify-between items-center space-x-4">
          <div className="flex">
            <span
              className={`flex items-center gap-1 text-xs mr-2`}
            >
              <motion.button
                whileTap={{ scale: 1.2, rotate: -15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // handle like logic here
                  if (userId && email) {
                    dispatch(toggleLikeTemplate({axiosPrivate, templateId: _id, user: { _id: userId, email: email }}));
                  }
                }}
                className="focus:outline-none"
              >
                <IconThumbUp className="text-green-600 dark:text-green-400 h-5 w-5 flex-shrink-0" />
              </motion.button>
              {likeCount}
            </span>
            <span
              className={`flex items-center gap-1 text-xs mr-2`}
            >
              <motion.button
                whileTap={{ scale: 1.2, rotate: 15 }}
                onClick={e => {
                  e.stopPropagation();
                  // handle dislike logic here
                  if (userId && email) {
                    dispatch(toggleDislikeTemplate({axiosPrivate, templateId: _id, user: { _id: userId, email: email }}));
                  }
                }}
                className="focus:outline-none"
              >
                <IconThumbDown className="text-red-600 dark:text-red-400 h-5 w-5 flex-shrink-0" />
              </motion.button>
              {dislikeCount}
            </span>
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="focus:outline-none">
            {isExpanded ? <IconChevronDown className="w-5 h-5" /> : <IconChevronUp className="w-5 h-5" />}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium rounded-full"
                >
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

export default TemplateCard;