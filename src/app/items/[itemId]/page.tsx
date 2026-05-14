"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { todoApi } from "@/lib/api";
import { TodoItem } from "@/types/todo";
import Input from "@/components/Input";
import Button from "@/components/Button";

interface DetailPageProps {
  params: Promise<{ itemId: string }>;
}

export default function DetailPage({ params }: DetailPageProps) {
  const router = useRouter();
  // Next.js 15 requires unwrapping params with React.use()
  const { itemId } = use(params);
  
  const [todo, setTodo] = useState<TodoItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await todoApi.getTodo(Number(itemId));
        setTodo(data);
        setName(data.name);
        setMemo(data.memo || "");
        setImageUrl(data.imageUrl || null);
        setIsCompleted(data.isCompleted);
      } catch (error) {
        console.error("Failed to fetch todo detail", error);
        alert("데이터를 불러오는데 실패했습니다.");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [itemId, router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 5MB 용량 제한
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert("이미지 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 파일 이름이 영어로만 이루어졌는지 확인
    const isEnglishOnly = /^[a-zA-Z0-9.\-_]+$/.test(file.name);
    if (!isEnglishOnly) {
      alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
      return;
    }

    try {
      const data = await todoApi.uploadImage(file);
      setImageUrl(data.url);
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleSave = async () => {
    try {
      await todoApi.updateTodo(Number(itemId), {
        name,
        memo,
        imageUrl: imageUrl || undefined,
        isCompleted,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to update todo", error);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await todoApi.deleteTodo(Number(itemId));
      router.push("/");
    } catch (error) {
      console.error("Failed to delete todo", error);
      alert("삭제에 실패했습니다.");
    }
  };

  if (loading || !todo) return <div className="text-center py-20">불러오는 중...</div>;

  return (
    <div className="flex flex-col gap-4 tablet:gap-6 w-full pc:max-w-[1200px] mx-auto bg-white pc:min-h-0 relative">
      
      {/* 상단 체크박스 및 제목 수정 영역 */}
      <div className={`flex items-center justify-center h-[48px] tablet:h-[64px] pc:w-[996px] pc:h-[64px] pc:mx-auto pc:flex pc:items-center pc:justify-center border-2 border-black rounded-[24px] transition-colors mb-[25px] tablet:mb-0 pc:mb-0 ${
        isCompleted ? 'bg-[#EDE9FE]' : 'bg-white'
      }`}>
        <div className="flex items-center gap-4 pc:gap-[16px] pc:flex pc:items-center pc:justify-center">
          {/* 체크박스 */}
          <button 
            onClick={() => setIsCompleted(!isCompleted)}
            className={`w-8 h-8 pc:w-[32px] pc:h-[32px] flex-shrink-0 rounded-full border-2 border-black flex items-center justify-center transition-colors ${
              isCompleted 
                ? 'bg-violet-600 text-white' 
                : 'bg-[#FEFCE8]' 
            }`}
          >
            {isCompleted && (
              <Image src="/images/icons/check.png" alt="Checked" width={24} height={24} className="invert pc:w-[20px] pc:h-[20px]" />
            )}
          </button>
          
          {/* 제목 영역 */}
          <div className="inline-grid items-center">
             <span className="invisible whitespace-pre text-xl pc:text-[32px] pc:leading-[32px] font-bold col-start-1 row-start-1 px-1">
               {name || "할 일 제목을 입력하세요"}
             </span>
             <input
               value={name}
               onChange={(e) => setName(e.target.value)}
               className="col-start-1 row-start-1 w-full text-xl pc:text-[32px] pc:leading-[32px] font-bold bg-transparent focus:outline-none border-none text-slate-900 text-left p-0 m-0 outline-none underline underline-offset-4 decoration-1"
               placeholder="할 일 제목을 입력하세요"
             />
          </div>
        </div>
      </div>

      {/* 컨텐츠 영역: 이미지 및 메모 — 모바일/태블릿은 세로, PC는 가로 */}
      <div className="flex flex-col pc:flex-row gap-[15px] tablet:gap-6 pc:gap-[24px] pc:mt-[24px] pc:mx-auto pc:justify-center">
        {/* 이미지 업로드 영역 */}
        <div className="flex flex-col w-[343px] h-[311px] mx-auto tablet:ml-0 tablet:w-full tablet:h-[311px] pc:w-[384px] pc:flex-none pc:h-[311px]">
          <label className="relative w-full h-full border-2 border-dashed border-slate-300 rounded-[24px] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden bg-slate-100 transition-colors">
            {imageUrl ? (
              <>
                <Image src={imageUrl} alt="Uploaded" fill className="object-cover" />
                <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center hover:opacity-90 transition-opacity">
                   <Image src="/images/icons/edit.png" alt="Edit" width={24} height={24} className="invert" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-full h-full relative">
                  <Image src="/images/illustrations/img-placeholder.png" alt="Upload" width={64} height={64} className="pc:hidden" />
                  <Image src="/images/illustrations/img-placeholder.png" alt="Upload" width={100} height={100} className="hidden pc:block" />
                </div>
                <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center hover:opacity-90 transition-opacity pc:border-none">
                   <Image src="/images/buttons/plus.png" alt="Add" width={24} height={24} />
                </div>
              </>
            )}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        {/* 메모 영역 */}
        <div className="flex flex-col w-[343px] h-[311px] mx-auto tablet:ml-0 tablet:w-full tablet:h-[311px] pc:w-[588px] pc:flex-none pc:h-[311px] rounded-[24px] overflow-hidden" style={{
            backgroundImage: "url('/images/illustrations/memo-bg.png')",
            backgroundColor: "#FEF3C7", // Amber-100 fallback
        }}>
          <div className="w-full h-full p-6 pc:p-10 flex flex-col">
            <span className="text-[#92400E] font-black text-center mb-4 pc:mb-8 pc:text-xl">Memo</span>
            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요..."
              className="w-full flex-grow bg-transparent focus:outline-none resize-none text-center leading-relaxed text-[#92400E] font-medium pc:text-lg"
              style={{
                lineHeight: "2rem",
              }}
            />
          </div>
        </div>
      </div>

      {/* 버튼 영역: 모바일/태블릿은 중앙, PC는 우측 정렬 */}
      <div className="flex gap-4 justify-center pc:justify-end mt-2 tablet:mt-4 pc:mt-[24px] pc:w-[996px] pc:mx-auto">
        <Button variant="secondary" onClick={handleSave} className="flex items-center justify-center gap-2 pc:w-[168px] pc:h-[56px]">
          <Image src="/images/icons/check.png" alt="Save" width={16} height={16} /> 수정 완료
        </Button>
        <Button variant="danger" onClick={handleDelete} className="flex items-center justify-center gap-2 pc:w-[168px] pc:h-[56px]">
          <Image src="/images/icons/X.png" alt="Delete" width={16} height={16} className="invert" /> 삭제하기
        </Button>
      </div>

    </div>
  );
}
