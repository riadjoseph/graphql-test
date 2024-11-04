from PIL import Image, ImageDraw, ImageFont
import os

# Placeholder data for 30 products
products = [
    {"name": "cookware_set", "color": "#8e44ad"},
    {"name": "frying_pan", "color": "#3498db"},
    {"name": "baking_dish", "color": "#2ecc71"},
    {"name": "skillet", "color": "#e74c3c"},
    {"name": "stock_pot", "color": "#34495e"},
    {"name": "measuring_cup", "color": "#1abc9c"},
    {"name": "spoon_set", "color": "#f39c12"},
    {"name": "knife_set", "color": "#9b59b6"},
    {"name": "whisk", "color": "#27ae60"},
    {"name": "spatula", "color": "#e67e22"},
    {"name": "oven_mitts", "color": "#c0392b"},
    {"name": "kitchen_scale", "color": "#2980b9"},
    {"name": "muffin_pan", "color": "#16a085"},
    {"name": "grill_pan", "color": "#8e44ad"},
    {"name": "baking_mat", "color": "#34495e"},
    {"name": "mixing_bowl", "color": "#d35400"},
    {"name": "cutting_board", "color": "#2980b9"},
    {"name": "cookie_sheet", "color": "#2c3e50"},
    {"name": "strainer", "color": "#f1c40f"},
    {"name": "storage_jar", "color": "#2ecc71"},
    {"name": "colander", "color": "#e74c3c"},
    {"name": "kitchen_rug", "color": "#9b59b6"},
    {"name": "salad_spinner", "color": "#3498db"},
    {"name": "drying_rack", "color": "#f39c12"},
    {"name": "spice_rack", "color": "#27ae60"},
    {"name": "teapot", "color": "#8e44ad"},
    {"name": "rolling_pin", "color": "#c0392b"},
    {"name": "garlic_press", "color": "#e67e22"},
    {"name": "steel_tongs", "color": "#1abc9c"},
    {"name": "measuring_spoons", "color": "#2980b9"}
]

# Directory to save the images
images_dir = "public/images"
os.makedirs(images_dir, exist_ok=True)

# Function to create a placeholder image
def create_placeholder_image(product, width=150, height=150):
    # Create a blank image with the specified background color
    image = Image.new("RGB", (width, height), product["color"])
    draw = ImageDraw.Draw(image)

    # Set text properties
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except IOError:
        # Fallback to a default PIL font if Arial is not available
        font = ImageFont.load_default()
    
    text = product["name"].replace("_", " ")
    text_width, text_height = draw.textbbox((0, 0), text, font=font)[2:4]
    text_x = (width - text_width) / 2
    text_y = (height - text_height) / 2

    # Draw text (Product Name)
    draw.text((text_x, text_y), text, fill="white", font=font)

    # Save the image to file
    image_path = os.path.join(images_dir, f"{product['name']}.png")
    image.save(image_path)
    print(f"Created placeholder image: {image_path}")

# Create placeholder images for all products
for product in products:
    create_placeholder_image(product)
