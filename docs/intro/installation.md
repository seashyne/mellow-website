---
sidebar_position: 2
title: Installation
---

# Installation

Clone the language source, then install from the checkout:

```powershell
git clone https://github.com/seashyne/mellow-programming-language.git
cd mellow-programming-language
python -m pip install -e .[dev]
mellow --version
mellow run examples\hello.mellow
mellow check examples\hello.mellow
mellow doctor
```

Without installing:

```powershell
$env:PYTHONPATH = "src"
python -m mellowlang --version
python -m mellowlang run examples\hello.mellow
```

Native C is the default execution engine in MellowLang 2.9.2. Use `--engine=py` to force the Python VM.

Optional features can be installed only when needed:

```powershell
python -m pip install -e .[lsp]
python -m pip install -e .[net]
python -m pip install -e .[security]
python -m pip install -e .[video]
python -m pip install -e .[all]
```
