---
title: "LVGL 下拉列表样式自定义"
date: "2026-05-18"
category: "LVGL"
tags: ["LVGL", "UI", "嵌入式", "样式"]
summary: "LVGL v8 中下拉列表（dropdown）各部分的样式修改方法。"
draft: false
favorite: false
difficulty: "入门"
---

# LVGL 下拉列表样式自定义

## 一句话总结

LVGL 的 dropdown 由主体、按钮、列表和列表项四部分组成，分别对应不同的样式部分。

## 核心概念

```c
// 主要样式部分
LV_DROPDOWN_PART_MAIN      // 主体背景
LV_DROPDOWN_PART_LIST      // 展开的列表背景
LV_DROPDOWN_PART_SCROLLBAR // 列表滚动条
LV_DROPDOWN_PART_SELECTED  // 当前选中项
LV_DROPDOWN_PART_BG        // 整体背景
```

## 代码示例

```c
static lv_style_t style_main;
lv_style_init(&style_main);
lv_style_set_bg_color(&style_main, lv_color_hex(0x2a2a2a));
lv_style_set_text_color(&style_main, lv_color_hex(0xffffff));
lv_style_set_border_color(&style_main, lv_color_hex(0x444444));
lv_style_set_border_width(&style_main, 1);
lv_style_set_pad_all(&style_main, 8);

lv_obj_t *dd = lv_dropdown_create(lv_scr_act());
lv_obj_add_style(dd, &style_main, LV_PART_MAIN);
lv_dropdown_set_options(dd, "Option 1\nOption 2\nOption 3");
```

## 修改列表样式

```c
static lv_style_t style_list;
lv_style_init(&style_list);
lv_style_set_bg_color(&style_list, lv_color_hex(0x1a1a1a));
lv_style_set_border_color(&style_list, lv_color_hex(0x333333));

lv_obj_t *list = lv_dropdown_get_list(dd);
lv_obj_add_style(list, &style_list, LV_PART_MAIN);
```

## 常见问题

**Q: 修改列表样式后不生效？**
A: 需要先调用 `lv_dropdown_get_list()` 获取列表对象，且要在 dropdown 创建后、展开前设置。
