import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins can't load.");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
  
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabin.image);
    // console.log(storageError);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    if (storageError) {
      console.error(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
  }
  return data;
}
