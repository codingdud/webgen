"use client";

import { useParams, useNavigate } from "react-router-dom";
import ImageCard from "../components/ui/imagecard";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { formatDistanceToNow } from "date-fns";
import { IconArrowLeft } from "@tabler/icons-react";


const statusColors = {
  draft: "bg-yellow-500",
  "in-progress": "bg-blue-500",
  completed: "bg-green-500",
};


const TemplateDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const temp = useSelector((state: RootState) =>
    state.templateState.templates.find((temp) => temp._id === id)
);
  return (
    <div className="min-h-screen px-6 py-4 dark:bg-neutral-900 dark:text-white bg-gray-100 text-gray-800">
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
        <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg text-md font-medium dark:text-white text-black hover:bg-sky-500"
        >
            <IconArrowLeft size={20} />
        </button>
        <span className="text-2xl font-semibold">
            {temp?.project?.title}
        </span>
    </div>

    {/* Details Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Description */}
        <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="mt-1 text-sm dark:text-neutral-300">{temp?.project?.description}</p>
        </div>
        {/* Read-only Details */}
        <div>
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Total Images:</span> {temp?.project?.images.length}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <span className="font-medium">Last Updated:</span>{" "}
                {formatDistanceToNow(new Date(temp?.project?.updatedAt ?? ''))} ago
            </p>
        </div>
        {/* Status */}
        <div>
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <span
                className={`px-2 py-1 text-white text-xs font-medium rounded ${statusColors[temp?.project?.status as keyof typeof statusColors]}`}
            >
                {temp?.project?.status}
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
                <span className="font-medium">Tags:</span>{" "}
                {temp?.project?.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-gray-200 dark:bg-neutral-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                ))}
            </div>
        </div>
    </div>

      {/* Images Grid */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {temp?.project?.images.map((img, index) => (
            <ImageCard
              key={index}
              {...img}
            />
          ))}
        </div>
      </div> 
    </div>
  );
};

export default TemplateDetailsPage;