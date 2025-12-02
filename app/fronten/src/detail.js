const cardData = {
  Fertilizers: {
    options: ["Vermicompost", "Neem Cake", "Bone Meal", "Seaweed Extract"],
    details: {
      Vermicompost: {
        description:
          "Rich in nutrients, improves soil structure and fertility. Ideal for most plants.",
        steps: [
          "Mix vermicompost into potting soil at 20% ratio.",
          "Apply around the base of plants every 4-6 weeks.",
          "Water well after applying to activate nutrients.",
        ],
      },
      "Neem Cake": {
        description:
          "Acts as natural fertilizer and mild pesticide, adds nitrogen and phosphorus.",
        steps: [
          "Sprinkle around plant roots before watering.",
          "Use 50g per pot for small plants; adjust for larger plants.",
          "Reapply every 6-8 weeks during growing season.",
        ],
      },
      "Bone Meal": {
        description:
          "High phosphorus content; promotes strong roots and flowering.",
        steps: [
          "Mix with soil before planting bulbs or flowering plants.",
          "Do not apply directly to roots; can burn seedlings.",
          "Use once during planting season.",
        ],
      },
      "Seaweed Extract": {
        description:
          "Liquid fertilizer; strengthens overall plant growth and root health.",
        steps: [
          "Dilute as per instructions (usually 1:1000).",
          "Spray on leaves or water the soil every 2-3 weeks.",
          "Use during active growth stages for best results.",
        ],
      },
    },
    color: "purple-700",
  },

  Soil: {
    options: ["Loam", "Sandy", "Clay", "Silty", "Peaty", "Chalky"],
    details: {
      Loam: {
        description:
          "Balanced mix of sand, silt, and clay. Excellent drainage and nutrient retention.",
        steps: [
          "Prepare a raised bed or pot with loamy soil.",
          "Add compost or organic matter for extra fertility.",
          "Water regularly but avoid waterlogging.",
        ],
      },
      Sandy: {
        description:
          "Drains quickly; good for root vegetables and herbs. Add compost to retain moisture.",
        steps: [
          "Mix in organic matter to retain water.",
          "Plant drought-tolerant herbs and vegetables.",
          "Water frequently during dry periods.",
        ],
      },
      Clay: {
        description:
          "Holds nutrients and water well; amend with sand or organic matter for drainage.",
        steps: [
          "Add sand and compost to improve drainage.",
          "Avoid compacting the soil with heavy tools.",
          "Mulch to prevent surface cracking.",
        ],
      },
      Peaty: {
        description: "Acidic, rich in organic matter; ideal for moisture-loving plants.",
        steps: [
          "Plant acid-loving species like blueberries.",
          "Keep soil moist but not waterlogged.",
          "Add lime if acidity is too high for certain plants.",
        ],
      },
      Chalky: {
        description:
          "Alkaline, drains quickly; may need organic matter to retain nutrients.",
        steps: [
          "Add compost to improve fertility and water retention.",
          "Suitable for vegetables like cabbage, spinach, and herbs.",
          "Water consistently, especially in hot weather.",
        ],
      },
    },
    color: "yellow-600",
  },

  Irrigation: {
    options: ["Drip", "Sprinkler", "Manual Watering"],
    details: {
      Drip: {
        description:
          "Water delivered directly to the roots through tubing. Efficient and conserves water.",
        steps: [
          "Install drip lines near plant bases.",
          "Check for clogs regularly.",
          "Adjust flow depending on plant size and weather.",
        ],
      },
      Sprinkler: {
        description:
          "Covers a wider area; ideal for lawns and larger garden beds.",
        steps: [
          "Set sprinklers for early morning or late evening watering.",
          "Avoid overwatering; monitor soil moisture.",
          "Move sprinklers periodically for even coverage.",
        ],
      },
      "Manual Watering": {
        description: "Traditional watering using watering cans or hoses.",
        steps: [
          "Water at the base of plants to reduce leaf diseases.",
          "Use consistent schedule depending on plant needs.",
          "Avoid waterlogging or dry spells.",
        ],
      },
    },
    color: "blue-600",
  },

  Climate: {
    options: ["Tropical", "Temperate", "Arid", "Cold"],
    details: {
      Tropical: {
        description:
          "High humidity, warm temperatures, ideal for many indoor and outdoor tropical plants.",
        steps: [
          "Choose plants that thrive in humid, warm environments.",
          "Provide shade for sensitive plants.",
          "Ensure proper ventilation to avoid fungal diseases.",
        ],
      },
      Temperate: {
        description:
          "Moderate climate with distinct seasons. Supports most garden plants.",
        steps: [
          "Select plants according to season.",
          "Protect sensitive plants during frost.",
          "Regularly mulch to retain soil moisture.",
        ],
      },
      Arid: {
        description:
          "Dry and hot climate; suitable for drought-resistant and succulent plants.",
        steps: [
          "Use sandy or well-draining soil.",
          "Water sparingly to prevent root rot.",
          "Provide partial shade during peak heat.",
        ],
      },
      Cold: {
        description: "Low temperatures; hardy plants survive frost and snow.",
        steps: [
          "Use frost-resistant plants.",
          "Mulch and cover sensitive plants in winter.",
          "Plan indoor growing for tropical species.",
        ],
      },
    },
    color :"pink-800",
  },

  Propagation: {
    options: ["Seed", "Cuttings", "Layering", "Division", "Grafting"],
    details: {
      Seed: {
        description: "Growing plants from seeds; encourages genetic diversity.",
        steps: [
          "Use sterile seed-starting mix.",
          "Sow seeds at recommended depth.",
          "Keep soil moist until germination.",
        ],
      },
      Cuttings: {
        description: "Take a piece of a parent plant to grow a clone.",
        steps: [
          "Take healthy stem or leaf cutting.",
          "Apply rooting hormone if desired.",
          "Place in soil or water until roots develop.",
        ],
      },
      Layering: {
        description: "Root a stem while it is still attached to the parent plant.",
        steps: [
          "Bend a branch to the ground and cover with soil.",
          "Wait until roots form, then separate.",
          "Air layering can be used for woody plants.",
        ],
      },
      Division: {
        description: "Separate a plant clump into smaller plants with roots and shoots.",
        steps: [
          "Dig up mature plant carefully.",
          "Separate root clumps gently.",
          "Replant and water immediately.",
        ],
      },
      Grafting: {
        description: "Join a scion to rootstock to combine desirable traits.",
        steps: [
          "Choose compatible scion and rootstock.",
          "Make clean cuts and secure with grafting tape.",
          "Monitor for growth and remove any weak shoots.",
        ],
      },
    },
    color: "green-700",
  },

  Pruning: {
    options: ["Light Pruning", "Hard Pruning", "Deadheading"],
    details: {
      "Light Pruning": {
        description: "Remove small or overgrown branches to shape plant.",
        steps: [
          "Use clean, sharp scissors or shears.",
          "Trim lightly to maintain shape.",
          "Do this during active growth periods.",
        ],
      },
      "Hard Pruning": {
        description: "Cut back branches heavily to encourage new growth.",
        steps: [
          "Remove 1/3 of the plant's size carefully.",
          "Prune during dormant season if possible.",
          "Monitor plant recovery over weeks.",
        ],
      },
      Deadheading: {
        description: "Remove faded flowers to encourage new blooms.",
        steps: [
          "Pinch or cut off dead flowers at base.",
          "Do this regularly during flowering season.",
          "Fertilize lightly after deadheading for best results.",
        ],
      },
    },
    color: "black",
  },

  SeasonalCare: {
    options: ["Winter Care", "Summer Care", "Monsoon Care", "Spring/Fall Care"],
    details: {
      "Winter Care": {
        description: "Protect plants from frost and low temperatures.",
        steps: [
          "Move sensitive plants indoors or cover with cloth.",
          "Mulch soil to retain warmth.",
          "Reduce watering frequency to avoid root rot.",
        ],
      },
      "Summer Care": {
        description: "Shield plants from excessive heat and sun.",
        steps: [
          "Provide shade or filtered sunlight.",
          "Water early morning or late evening.",
          "Check for pests that thrive in heat.",
        ],
      },
      "Monsoon Care": {
        description: "Prevent waterlogging and fungal issues.",
        steps: [
          "Ensure pots have drainage holes.",
          "Avoid overwatering.",
          "Use fungicide if needed for sensitive plants.",
        ],
      },
      "Spring/Fall Care": {
        description: "Seasonal transition care for healthy growth.",
        steps: [
          "Fertilize appropriately for growth or flowering.",
          "Prune old branches as needed.",
          "Check for pests and treat early.",
        ],
      },
    },
    color: "red-600",
  },

  IndoorPlants: {
    options: ["Pothos", "Spider Plant", "Peace Lily", "Snake Plant"],
    details: {
      Pothos: {
        description:
          "Easy-care vine, tolerates low light, grows fast.",
        steps: [
          "Water when topsoil is dry.",
          "Place in bright, indirect light for best growth.",
          "Trim vines occasionally to encourage bushier growth.",
        ],
      },
      "Spider Plant": {
        description: "Hardy indoor plant, air-purifying, produces offshoots.",
        steps: [
          "Keep soil slightly moist.",
          "Bright indirect light preferred.",
          "Divide offshoots to propagate.",
        ],
      },
      "Peace Lily": {
        description: "Elegant flowering plant, low maintenance.",
        steps: [
          "Water regularly but avoid waterlogging.",
          "Thrives in low to medium light.",
          "Remove faded flowers promptly.",
        ],
      },
      "Snake Plant": {
        description: "Tolerates drought, purifies air.",
        steps: [
          "Allow soil to dry between watering.",
          "Bright indirect light preferred but tolerates low light.",
          "Clean leaves to remove dust.",
        ],
      },
    },
    color: "green-500",
  },
};

export default cardData;
