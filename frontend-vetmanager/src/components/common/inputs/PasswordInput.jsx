import { useState } from "react";

import { BaseInput } from "./BaseInput";

export function PasswordInput (props) {
    const [hidden, setHidden] = useState(true)

    const type = hidden ? "password" : "text"

    return <BaseInput {...props} type={type} />;
}