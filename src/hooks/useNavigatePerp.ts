import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { PathEnum } from "@/constant";
import { updateSymbol } from "@/storage";

export function useNavigatePerp() {
  const router = useRouter();

  const navigatePerp = useCallback(
    (symbol?: string) => {
      if (symbol) {
        updateSymbol(symbol);
      }
      router.push(PathEnum.Root);
    },
    [router],
  );

  return navigatePerp;
}
