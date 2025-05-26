// to change the theme based on the button click slected
export function theme() 
{
  // get data-theme="dark" as local storage
  const savedTheme = localStorage.getItem("dark");

  //get data- attribute by setting its value and name to saved dark theme
  //this is to set by default for all pages to dark theme
  document.documentElement.setAttribute("data-theme", savedTheme);
//use class from css for each button add event of click
  document.querySelectorAll(".theme-switch").forEach(btn => {
    btn.addEventListener("click", () => {
//get attribute again
      const selectedTheme = btn.getAttribute("data-theme");
//set it back to the selected theme new variable
      document.documentElement.setAttribute("data-theme", selectedTheme);
    //to save across tabs
      localStorage.setItem("dark", selectedTheme);
    });
  });
}
