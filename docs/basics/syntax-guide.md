---
sidebar_position: 1
title: Syntax Guide
---

# Syntax Guide

Mellow มี syntax คล้าย Python

```mellow
let hp = 100

def add(a, b):
    return a + b

print(add(2,3))

# Control Flow

if hp < 10:
    print("low")
elif hp < 50:
    print("warning")
else:
    print("ok")