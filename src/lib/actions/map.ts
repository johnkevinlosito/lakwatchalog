import { NominatimResult, SearchActionResponse } from "@/types/map";

export async function searchPlaceAction(
  prevState: SearchActionResponse | null,
  formData: FormData
): Promise<SearchActionResponse> {
  try {
    const query = formData.get("q");
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
      {
        signal: AbortSignal.timeout(5000),
        headers: {
          "Accept-Language": "en-US",
          "User-Agent": "lakwatchalog",
        },
      }
    );
    if (!response.ok) {
      return {
        success: false,
        message: "Unable to reach search API.",
      };
    }
    const result = (await response.json()) as NominatimResult[];
    return { success: true, result };
  } catch {
    return {
      success: false,
      message: "Unable to reach search API.",
    };
  }
}
