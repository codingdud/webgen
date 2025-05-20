import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft, IconFilter} from "@tabler/icons-react";
import { cn } from "../lib/utils";
import { TagInput } from "../components/ui/tag";
import TemplateGalleryLoading from "../components/splash/templateloading";
import useTemplates from "../hooks/useTemplate";
import TemplateCard from "../components/ui/templateCard";

const TemplatePage = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Predefined tag options
  const tagOptions = [
    { value: 'ai', label: 'AI' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'desktop', label: 'Desktop' }
  ];

  const navigate = useNavigate();

  // Use the custom hook with initial values
  const {
    templates,
    pagination,
    loading,
    refetch
  } = useTemplates({
    page: 1,
    limit: 10
  });

  const handleApplyFilters = () => {
    refetch({
      page: 1,
      limit: 10,
      projectTitle: searchTitle,
      tags: tags.length > 0 ? tags : undefined
    });
  };

  const handlePageChange = (step: number) => {
    const newPage = pagination.page + step;
    if (newPage > 0 && newPage <= pagination.totalPages) {
      refetch({
        page: newPage,
        limit: 10,
        projectTitle: searchTitle,
        tags: tags.length > 0 ? tags : undefined
      });
    }
  };

  if (loading && templates.length === 0) {
    return <TemplateGalleryLoading />;
  }

  return (
    <div className="min-h-screen px-6 py-4 dark:bg-neutral-900 dark:text-white bg-gray-100 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg text-md font-medium dark:text-white text-black hover:bg-sky-500"
        >
          <IconArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-semibold">Template Gallery</h1>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex gap-4 w-full md:w-auto">
          <TagInput
            className="w-full md:w-94"
            value={tags}
            options={tagOptions}
            onChange={setTags}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center w-full md:w-auto">
          <input
            type="text"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder="Search templates..."
            className="flex-grow px-4 py-2 rounded-lg border bg-white text-gray-700 dark:bg-neutral-800 dark:text-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 w-full md:w-auto rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <IconFilter size={20} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Template Cards */}
      {templates.length === 0 &&
        <p className="text-2xl text-center text-gray-500 dark:text-gray-400">
          No templates available
        </p>
      }
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard
        key={template._id}
        _id={template._id}
        project={template.project}
        likeCount={template.likeCount}
        dislikeCount={template.dislikeCount}
        createdAt={template.createdAt}
    />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 0 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(-1)}
              className={cn(
                "px-4 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600",
                pagination.page === 1 ? "hidden" : "block"
              )}
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(1)}
              className={cn(
                "px-4 py-2 rounded-lg bg-gray-200 text-gray-700 dark:bg-neutral-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-600",
                pagination.page === pagination.totalPages ? "hidden" : "block"
              )}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePage;