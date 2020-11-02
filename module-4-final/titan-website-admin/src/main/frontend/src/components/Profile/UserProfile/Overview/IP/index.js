import React from "react"
import { Descriptions, Card } from "antd"

export default function UserIP() {
    const IP = {
        "IP Address": "1.53.255.136 (IPv4)",
        Location: "Unknown",
        Country: "Vietnam (VN)",
        "Latitude & Longitude": "10.81420, 106.64680",
        "Tor Relay IP Address": "No",
        "VPN IP Address": "Not Detected",
        "Proxy IP Address": "Not Detected",
        Hostname: "Unknown. Could not resolve hostname.",
    }

    return (
        <Card
            title='IP Details'
            headStyle={{ fontWeight: "bold", fontSize: "1.3em" }}
            hoverable={true}
        >
            <Descriptions column={1} bordered>
                {Object.keys(IP).map((k, i) => (
                    <Descriptions.Item label={k} key={i}>
                        {IP[k]}
                    </Descriptions.Item>
                ))}
            </Descriptions>
        </Card>
    )
}
