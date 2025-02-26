const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhrc2RndWZjdnlrY3d2Z3V5eXB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTI2NDk4NywiZXhwIjoyMDU0ODQwOTg3fQ.nH8cSZ8Ce1MSwNi9UyWK_wDQDg_rvnloBE3NYgXwABo ";
const SUPABASE_URL = "https://xksdgufcvykcwvguyypx.supabase.co";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let localData = JSON.parse(localStorage.getItem("auth"));
if (localData == null) {
  window.LoggedIn = false;
  localStorage.setItem("auth", JSON.stringify({ auth: false, user: "" }));
  localData = JSON.parse(localStorage.getItem("auth"));
}
// Global variables
window.user = localData.user;
window.LoggedIn = localData.auth;

// Saves product data to supabase
async function saveToSupabase(prod) {
  const { data, error } = await supabase
    .from("data")
    .insert([
      {
        title: prod.title,
        description: prod.description,
        useCase: prod.useCase,
        tags: prod.tags,
        link: prod.link,
        image: prod.imagePath,
      },
    ])
    .select("id");

  if (error) {
    console.error("Error inserting data:", error);
    alert("Failed to save product to Supabase!");
  } else {
    console.log("Product saved successfully:", data);
    alert("Product added successfully!");
    updateUserArray(data[0].id);
  }
}

// Updates the array of id's which the user have to track what our user have added
async function updateUserArray(id) {
  // Step 1: Get the current array of IDs
  const { data, error } = await supabase
    .from("authentication")
    .select("data")
    .eq("username", user)
    .single();

  if (error) {
    console.error("Error fetching user data:", error);
    return;
  }

  let updatedArray = data?.data || [];
  if (!updatedArray.includes(id)) {
    updatedArray.push(id);
  }

  // Step 2: Update the user's array with the new ID
  const { error: updateError } = await supabase
    .from("authentication")
    .update({ data: updatedArray })
    .eq("username", user);

  if (updateError) {
    console.error("Error updating user array:", updateError);
  } else {
    console.log("User array updated successfully!");
  }
}

// Fetched all the data from supabase
async function loadFromSupabase() {
  try {
    const { data, error } = await supabase.from("data").select("*");

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error loading data from Supabase:", error.message);
    return [];
  }
}

// Checks if useranme and passwrod is correct for login
async function checkIfExists(email, password) {
  try {
    const column = email.includes("@") ? "email" : "username";
    const { data, error } = await supabase
      .from("authentication")
      .select("email, password, username")
      .eq(column, email)
      .eq("password", password)
      .single();

    if (error) {
      console.log("Error fetching data: ", error);
      return false;
    }

    if (data) {
      window.user = data.username;
      return true;
    }

    return data !== null;
  } catch (error) {
    console.error("Error verifing data from supabase: ", error.message);
  }
}

// Add a new user
async function addSignUpData(username, email, password) {
  const { data, error } = await supabase.from("authentication").insert([
    {
      username: username,
      email: email,
      password: password,
      data: [],
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    alert("There was an error saving the data please try again");
  } else {
    console.log("Signup saved");
  }
}

// Checks if the usrname and email is unique
async function isUnique(identifier) {
  const column = identifier.includes("@") ? "email" : "username";
  try {
    const { data, error } = await supabase
      .from("authentication")
      .select(column)
      .eq(column, identifier)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        // No data found
        return true; // Unique (safe to use)
      }
      console.error("Error fetching data: ", error);
      return false; // Assume not unique if there's an unexpected error
    }

    return data === null; // If data exists, it's NOT unique
  } catch (err) {
    console.error("Error verifying data from Supabase: ", err.message);
    return false;
  }
}

// Update the data in data table
async function updateProdData(id, newData) {
  const { error } = await supabase
    .from("data")
    .update(newData)
    .match({ id: id });

  if (error) {
    console.error("Error updating data:", error);
  } else {
    console.log("Data updated successfully!");
    alert("Date updated sucessfully refresh to see changes")
  }
}

// Deleting a product from data table
async function deleteProduct(id) {
  // Step 1: Delete the product from "data" table
  const { error } = await supabase
    .from("data")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error.message);
    return;
  } else {
    console.log("Product deleted successfully.");
    alert("Product deleted successfully.");
  }

  // Step 2: Fetch user product array from "authentication" table
  const { data, error: fetchError } = await supabase
    .from("authentication")
    .select("data")
    .eq("username", user)
    .single();

  if (fetchError) {
    console.error("Error fetching user data:", fetchError.message);
    return;
  }

  // Step 3: Remove the deleted product ID from the user's array
  let updatedArray = data?.data || []; // Ensure data exists
  for (let i = 0; i < updatedArray.length; i++) {
    if (updatedArray[i] === String(id)) { // Ensuring type match
      updatedArray.splice(i, 1);
      break;
    }
  }

  // Step 4: Update the "authentication" table with modified array
  const { error: updateError } = await supabase
    .from("authentication")
    .update({ data: updatedArray })
    .eq("username", user);

  if (updateError) {
    console.error("Error updating user array:", updateError.message);
  } else {
    console.log("User array updated successfully!");
  }
}
