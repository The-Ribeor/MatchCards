import { TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/LogoHeader.png")}
        style={{ width: 87, height: 38 }}
      />
    </TouchableOpacity>
  );
};
