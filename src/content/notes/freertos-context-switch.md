---
title: "FreeRTOS 上下文切换"
date: "2026-05-25"
category: "FreeRTOS"
tags: ["FreeRTOS", "PendSV", "任务调度", "上下文切换"]
summary: "记录 FreeRTOS 中任务切换的核心流程和面试表达方式。"
draft: false
favorite: true
difficulty: "进阶"
---

# FreeRTOS 上下文切换

## 一句话总结

FreeRTOS 的上下文切换通常通过 PendSV 异常完成。

## 核心流程

1. SysTick 产生系统节拍。
2. 内核判断是否需要切换任务。
3. 触发 PendSV。
4. 保存当前任务上下文。
5. 恢复下一个任务上下文。
6. 返回后运行新任务。

## 面试回答

FreeRTOS 通常使用 PendSV 来完成任务上下文切换，因为 PendSV 的优先级可以设置得很低，适合在其他中断处理完成后再进行任务切换。

## 代码示例

```c
void xPortPendSVHandler(void)
{
    __asm volatile
    (
        "mrs r0, psp              \n"
        "isb                      \n"
        "ldr  r3, pxCurrentTCBConst \n"
        "ldr  r2, [r3]            \n"
        "stmdb r0!, {r4-r11}      \n"
        "str r0, [r2]             \n"
        "stmdb sp!, {r3, r14}     \n"
        "mov r0, %0               \n"
        "msr basepri, r0          \n"
        "bl vTaskSwitchContext    \n"
        "mov r0, #0               \n"
        "msr basepri, r0          \n"
        "ldmia sp!, {r3, r14}     \n"
        "ldr r1, [r3]             \n"
        "ldr r0, [r1]             \n"
        "ldmia r0!, {r4-r11}      \n"
        "msr psp, r0              \n"
        "isb                      \n"
        "bx r14                   \n"
    );
}
```

## 常见问题

**Q: 为什么用 PendSV 而不是 SysTick 直接切换？**
A: SysTick 负责产生节拍，PendSV 负责实际切换。分离后可以在其他高优先级中断完成后再切换，减少中断延迟。

**Q: 上下文切换保存哪些寄存器？**
A: 硬件自动保存 R0-R3、R12、LR、PC、xPSR。软件需要保存 R4-R11。
