import supabase from "./supabase";

// now we wanted to load clicks related to partcular user because that's we are going to show inside of our dashboard  page

export async function getClicksforUrls(urlIds) {
  // we wantt to fetch clicks for urlIds named array

  const {data,error} = await supabase
  .from("clicks")
  .select("*")
  // The column to filter on
  // Match only rows where column is included in the values array.
  .in("url_id",urlIds)

  if(error) {
    console.log(error.message);
    throw new Error("Unable to load clicks")
  }
  return data
} 