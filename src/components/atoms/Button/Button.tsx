import { Text, TouchableOpacity } from "react-native";
import { buttonStyles } from "./Button.styles";

type ButtonProps = {
    text: string;
    type: string;
    onPress?: () => void;
}

export default function CustomButton({ text, type, onPress }: ButtonProps) {
    const isPrimary = type === 'primary';
    const color = isPrimary ? '#F2C94C' : '#7D8790';
    return (
        <TouchableOpacity
            style={[buttonStyles.button, { backgroundColor: color }]}
            onPress={onPress}
        >
            <Text style={buttonStyles.text}>{text}</Text>
        </TouchableOpacity>
    )
};