#!/bin/bash

# Create a simple 72x72 black PNG with green terminal symbol using base64
# This is a minimal valid PNG file
base64 -d << 'IMGEOF' > action.png
iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB
NUlEQVR4nO3YsQ3CMBRFUeMCVAyQjgFYgIoRKJmAhgXYgA2oGCBbUKVIIShKgmzJL/eckksb/fvl
vRJJkiRJkiRJkiRJkv6XPXAABuC48zmA/Q/e5wgcgRM47rwuYP+N7/IAJmDueIZsz5LtSbLPb3yX
CzADS8czZXuWbE+SfX7ju1yABVg7nrnv79L3d+n7u/T9Xfr+Ln1/l76/S9/fpe/vkvd3yfu75P1d
8v4ueX+XvL9L3t8l7++S93fJ+7vk/V3y/i55f5e8v0ve3yXv75L3d8n7u+T9XfL+Lnl/l7y/S97f
Je/vkvd3yfu75P1d8v4ueX+XvL9L3t8l7++S93fJ+7vk/V3y/i55f5e8v0ve3yXv75L3d8n7u+T9
XfL+Lnl/l7y/S97fJe/vkvd3yfm7SJIkSZIkSZIkSdJ3vQHXhBp0+1zI+AAAAABJRU5ErkJggg==
IMGEOF

# Create 144x144 version (2x)
base64 -d << 'IMGEOF' > action@2x.png
iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC
LUlEQVR4nO3YsQ3CMBRFUeMCVAyQjgFYgIoRKJmAhgXYgA2oGCBbUKVIIShKgmzJL/eckksb/fvl
vRJJkiRJkiRJkiRJkv6rPXAABuC48zmA/Q/e5wgcgRM47rwuYP+N7/IAJmDueIZsz5LtSbLPb3yX
CzADS8czZXuWbE+SfX7ju1yABVg7nrnv79L3d+n7u/T9Xfr+Ln1/l76/S9/fpe/vkvd3yfu75P1d
8v4ueX+XvL9L3t8l7++S93fJ+7vk/V3y/i55f5e8v0ve3yXv75L3d8n7u+T9XfL+Lnl/l7y/S97f
Je/vkvd3yfu75P1d8v4ueX+XvL9L3t8l7++S93fJ+7vk/V3y/i55f5e8v0ve3yXv75L3d8n7u+T9
XfL+Lnl/l7y/S97fJe/vkvd3yfu75P1d8v4ueX+XvL9L3t8l7++S93fJ+7vk/V3y/i55f5e8v0ve
3yXv75L3d8n7u+T9XfL+Lnl/l7y/S97fJe/vkvd3yfu75P1d8v4ueX+XvL9L3t8l7++S93fJ+7vk
/V3y/i55f5e8v0ve3yXv75L3d8n7u+T9XfL+Lnl/l7y/S97fJe/vkvd3yfu75P1d8v4ueX+XvL9L
3t8l7++S93fJ+7vk/V3y/i55f5e8v0ve3yXv75L3d8n7u+T9XfL+Lnl/l7y/S97fJe/vkvd3yfu7
5P1d8v4ueX+XvL9L3t8l7++S93fJ+bvkvZIkSZIkSZIkSZL+9AJxZhp0ScvF3gAAAABJRU5ErkJg
gg==
IMGEOF

chmod +x create-icons.sh
