import { DatabaseAdvertisement } from "@/types/database";
import { supabase, getSupabaseClient } from "@/lib/supabase/client";

export async function getActiveAds(placement?: string): Promise<DatabaseAdvertisement[]> {
  let query = supabase
    .from("ad_placements")
    .select("*")
    .eq("is_active", true)
    .order("priority", { ascending: false });

  if (placement) {
    query = query.eq("placement_area", placement);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Advertisement Service Error - getActiveAds:", error);
    return [];
  }
  return (data || []) as DatabaseAdvertisement[];
}

export async function getAllAds(token?: string): Promise<DatabaseAdvertisement[]> {
  const client = getSupabaseClient(token);
  const { data, error } = await client
    .from("ad_placements")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []) as DatabaseAdvertisement[];
}

export async function cleanupInvalidAds(): Promise<void> {
  return;
}

export async function createAd(
  adData: {
    title: string;
    image_url: string;
    link_url?: string;
    target_url?: string;
    cta_text?: string;
    placement_area?: string;
    placement?: string;
    priority?: number;
    max_display_count?: number;
    start_date?: string;
    end_date?: string;
    is_active?: boolean;
  },
  token?: string
): Promise<DatabaseAdvertisement> {
  const client = getSupabaseClient(token);
  const payload = {
    title: adData.title,
    image_url: adData.image_url,
    link_url: adData.link_url ?? adData.target_url ?? "",
    placement_area: adData.placement_area ?? adData.placement ?? "sidebar",
    priority: adData.priority ?? 10,
    max_display_count: adData.max_display_count ?? 0,
    is_active: adData.is_active ?? true,
  };
  const { data, error } = await client
    .from("ad_placements")
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data as DatabaseAdvertisement;
}

export async function updateAd(
  id: string,
  adData: Partial<{
    title: string;
    image_url: string;
    link_url: string;
    target_url: string;
    cta_text: string;
    placement_area: string;
    placement: string;
    priority: number;
    max_display_count: number;
    start_date: string;
    end_date: string;
    is_active: boolean;
  }>,
  token?: string
): Promise<DatabaseAdvertisement> {
  const client = getSupabaseClient(token);
  const { data, error } = await client
    .from("ad_placements")
    .update(adData)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as DatabaseAdvertisement;
}

export async function deleteAd(id: string, token?: string): Promise<void> {
  const client = getSupabaseClient(token);
  const { error } = await client.from("ad_placements").delete().eq("id", id);
  if (error) throw error;
}

export async function trackAdImpression(_adId: string): Promise<void> {
  return;
}

export async function trackAdClick(_adId: string): Promise<void> {
  return;
}
