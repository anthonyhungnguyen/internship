package com.example.vng.model;

import com.arangodb.springframework.annotation.Document;
import com.arangodb.springframework.annotation.Relations;
import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;


@Document("devices")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Device {
    @Id
    private String id;

    private String os_version;
    private String hw_capacity_bluetooth;
    private String cellular_capabilities;
    private String user_agent;
    private String hw_screen_aspect_ratio;
    private String hw_capacity_force_touch;
    private String hw_capacity_gps;
    private String network_wifi_mac_address;
    private String os_name;
    private String hw_device_string;
    private String hw_storage_total;

    @Relations(edges = UserDevice.class, lazy = true)
    private List<User> users;
    private String os_multitasking;
    private String hw_ram_total;
    private String hw_screen_size;
    private String hw_capacity_cellular;
    private String hw_device_model;
    private String zid;
    private String timestamp;
    private String wifi_bssid;
    private String hw_capacity_nfc;
    private String wifi_ssid;
}
