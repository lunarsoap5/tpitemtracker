using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        { 
        }

        protected void ImageButton_Click(object sender, EventArgs e)
        {
            ImageButton clickedItem = (ImageButton)sender;
            if (clickedItem.CssClass == "itemNotSelected")
            {
                clickedItem.CssClass = "itemSelected";
            }
            else
            {
                clickedItem.CssClass = "itemNotSelected";
            }
            
        }
    }
}