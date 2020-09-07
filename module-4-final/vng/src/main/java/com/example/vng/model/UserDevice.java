package com.example.vng.model;

import com.arangodb.springframework.annotation.Edge;
import com.arangodb.springframework.annotation.From;
import com.arangodb.springframework.annotation.Relations;
import com.arangodb.springframework.annotation.To;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.util.List;

@Edge("user_device")
@Getter
@Setter
@ToString
public class UserDevice {
    @Id
    private String id;

    @From
    private User user;

    @To
    private Device device;

    private List<String> installed_packages;
    private List<String> system_packages;
    private List<String> list_of_wifi;
    private List<String> ringtone;
    private String hw_cpu_speed;
    private String hw_cpu_core_count;
    private String hw_released;
    private String hw_cpu_manufacturer;
    private String hw_screen_resolution;
    private String hw_screen_refresh_rate;
    private String hw_bluetooth_address;
    private String hw_screen_pixel_density;
    private String hw_camera_back_max_photo_resolution;
    private String os_root_access;
    private String hw_camera_number_camera;
    private String hw_cpu_name;
    private String hw_cpu_min_speed;
    private String hw_cpu_supported_32_bit_abis;
    private String hw_camera_front_max_video_resolution;
    private String os_version_name;
    private String hw_cpu_supported_64_bit_abis;
    private String hw_device_manufacturer;
    private String hw_camera_back_max_video_resolution;
    private String hw_cpu_processor;
    private String hw_camera_front_max_photo_resolution;
    private String os_version;
    private String user_agent;
    private String hw_screen_aspect_ratio;
    private String network_wifi_mac_address;
    private String os_name;
    private String hw_device_string;
    private String hw_storage_total;
    private String hw_ram_total;
    private String hw_screen_size;
    private String hw_device_model;
    private String timestamp;
}
