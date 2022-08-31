import React from "react";

export default function Another(props: {
    name: string
}) {
    return (
        <div>
            Another Component, { props.name }
        </div>
    )
}
