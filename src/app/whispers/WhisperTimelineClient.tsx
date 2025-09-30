"use client";
import PageIntro from "@/components/PageIntro";
import { WhisperListResponse, WhisperStatsResponse } from "@/types/whisper";
import { Empty, Input, Pagination, Spin, Tag } from "antd";
import { useState } from "react";
import useSWR from "swr";
import WhisperAdminControls from "./components/WhisperAdminControls";
import WhisperEntryCard from "./components/WhisperEntryCard";
import WhisperTechDetails from "./WhisperTechDetails";

const { Search } = Input;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WhisperTimelineClient() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Build query string
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: "20",
    ...(searchQuery && { search: searchQuery }),
    ...(selectedTag && { tag: selectedTag }),
  });

  const { data, error, isLoading, mutate } = useSWR<WhisperListResponse>(
    `/api/whispers/list?${queryParams}`,
    fetcher,
  );

  // Get stats for header
  const { data: stats } = useSWR<WhisperStatsResponse>(
    "/api/whispers/stats",
    fetcher,
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setPage(1);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center p-12 text-red-600 bg-red-50 border border-red-200 rounded-xl">
          Failed to load whisper entries. Please try again.
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-milktea-800">Whispers</h1>
            <PageIntro>
              <WhisperTechDetails />
            </PageIntro>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Search
              placeholder="Search..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 200 }}
              size="small"
            />

            <WhisperAdminControls onClearSuccess={() => mutate()} />
          </div>
        </div>

        {selectedTag && (
          <div className="flex items-center gap-2">
            <Tag
              closable
              onClose={() => setSelectedTag(null)}
              className="bg-milktea-500 text-white border-milktea-500"
            >
              #{selectedTag}
            </Tag>
          </div>
        )}

        {/* Stats as footnote */}
        {stats && (
          <div className="text-[10px] text-milktea-400 opacity-60">
            {stats.overview.totalEntries} entries /{" "}
            {stats.overview.totalWithImages} with images /{" "}
            {stats.overview.totalTags} tags
          </div>
        )}
      </header>

      {/* Content */}
      <div className="relative">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spin size="large" />
          </div>
        ) : !data?.data || data.data.length === 0 ? (
          <Empty
            description="No whisper entries found"
            className="py-12"
          ></Empty>
        ) : (
          <>
            {/* Timeline */}
            <div className="relative">
              {/* Vertical timeline line - dashed style */}
              <div className="absolute left-6 top-0 bottom-0 w-px border-l-2 border-dashed border-milktea-300"></div>

              <div className="space-y-6">
                {data.data.map((entry) => (
                  <WhisperEntryCard
                    key={entry.id}
                    entry={entry}
                    selectedTag={selectedTag}
                    onTagClick={handleTagClick}
                    onDeleteSuccess={() => mutate()}
                  />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {data.pagination.pages > 1 && (
              <div className="flex justify-center mt-12 pt-8">
                <Pagination
                  current={page}
                  total={data.pagination.total}
                  pageSize={data.pagination.limit}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} of ${total} entries`
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
