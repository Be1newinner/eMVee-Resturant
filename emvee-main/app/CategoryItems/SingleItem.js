import AddToCart2 from "@/components/AddToCart2";

export default function CategorySingleItem({ item, handlePress }) {
  return (
    <View
      onPress={handlePress}
      AddToCart2style={{
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 20,
        borderBottomColor: "rgba(0,0,0,0.2)",
        borderBottomWidth: 1,
        gap: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            // fontWeight: 400,
          }}
        >
          {item.title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Text
            style={{
              fontWeight: 600,
              fontSize: 18,
            }}
          >
            ₹{item.price}
          </Text>
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: "line-through",
            }}
          >
            ₹{item.mrp}
          </Text>
        </View>
        <Text
          style={{
            color: "#678",
            fontSize: 16,
          }}
        >
          {item.description}
        </Text>
      </View>
      <View
        style={{
          gap: 10,
        }}
      >
        <View
          style={{
            overflow: "hidden",
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Image
            style={{
              width: 130,
              height: 130,
              borderWidth: 2,
              borderColor: "rgba(0,0,0,0.1)",
              borderRadius: 10,
            }}
            source={item.image}
          />
        </View>

        <AddToCart2 />
      </View>
    </View>
  );
}
