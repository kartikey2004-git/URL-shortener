import supabase from "./supabase";

export async function getUrls(user_id) {

  // fetch urls and clicks api

  // The columns to retrieve, separated by commas. Columns can be renamed when returned with customName:columnName
  // Perform a SELECT query on the table or view.


  // from which table we have to fetch 


  // The column to filter on
  // Match only rows where column is equal to value.
  // To check if the value of column is NULL, you should use .is() instead.

  const {data,error} = await supabase
  .from("urls")
  .select("*")
  .eq("user_id",user_id)

  if(error) {
    console.log(error.message);
    throw new Error("Unable to load URLs")
  }
  return data

  // now we wanted to load clicks related to partcular user because that's we are going to show inside of our dashboard  page
} 