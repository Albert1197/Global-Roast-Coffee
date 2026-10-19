"""Catálogo de cafés de Global Roast Coffee.

Puerto de src/data/products.js (el catálogo original de React) para
que el backend sea la única fuente de verdad de precios y datos.
"""
from app.models import Product

PRODUCTS: list[Product] = [
    Product(
        id="pacamara",
        name="Pacamara",
        origin="El Salvador · Apaneca-Ilamatepec",
        origin_short="EL SALVADOR · APANECA-ILAMATEPEC",
        notes="Chocolate oscuro, frutos rojos, panela",
        notes_short="Chocolate oscuro, frutos rojos, panela",
        price=6.5,
        roast="Medio",
        badge_tueste="Tueste medio",
        process="Proceso Lavado",
        altitude="1,400–1,700 msnm",
        variety="Pacamara",
        description=(
            "Variedad nacida en El Salvador del cruce entre Pacas y Maragogipe. "
            "Granos grandes, cuerpo cremoso y una dulzura que recuerda a las fincas "
            "del occidente del país."
        ),
        img_home=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAiNcSU4LxVyR3qESXKndHMYk9--I4Y9h4wwTGa-m8YNfr4s8Kx3L5mZWAR203aIjFkgeiOMVxjM8g_iTkKA_9o__dXUdI2GMUUyGht_BLk4Y6xUvGrqrUtFDB-P0e5zZjPwzmf92EVdNhGHqz0vo6zqZ4iGsuY7Y_6x9orfMfTcD8Ss_EA3VWr9QxINsWwmRQrgXfwun2U7TsZJvn91xTGz0fhczv3IG2eS95yVdh0jDiVQrLlO5__Kw"
        ),
        img_tienda=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD2jO3OiB1gPCvO4QezqOysDWmOs5qPBHv5qO1NgS7luNdpMCTiesMMOB3Vf_55ufBbJDRN7tqS5kt82rSchZ9KnnCRF6PnzeXXiEgTHydws_PBpK_racerGRCV14sU4mhczj1jOvJ5QniIaeyx1jiaMCb1ZMrlmm1sziU7njrSt5IE5gjKo_bRPOMY04NcInyzH0hZPoJVe_rEw4Go1j3xIgmHkJXl3lHe0MY04qgpMrP-tnOaxmV45A"
        ),
        img_detalle=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC-aO8EiCpQ3PsB1VdaHoyQj3TmAWKeUTGLLQC7JvlO-C9g3cm3PX9kFMAklp2OOI22UJtQ3wdk0-Lo579skCHYaw1aXhxQAflbsUDZjIUIm4YLv8LMNha2VBHdwec6QwbTQDU_J4gVFN5tvvyH7TM5Gjcdgd2xnqAGvGVAHHou-cECBAQhIKwySbbA3YTjDwjuWYFuCX6U0O4ifEwekRIGqmjmJSx77UD_PT7qSLXxcK_qxEt3T23GLA"
        ),
        img_thumb=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCeD53FxGeybzqxoRX-3v7yJnk23xufYqPhUww8QSTCVELgGagHVXSmCaCa2LEXxUgr7A3LH5AJr8_ciYCozkqKCNi-fxPjFLkTLlr6wXbbjt95QzF7YG1LrCGqpTEeLfwzTc4aq9h36ZiWa3imnAnHcuLhp_8drXMn_jB2tYPLly7OLckqXb-4l5FW5921LtPyHKPMZXOCZu6X4puDCZErwezGksq8PUWeQujvy8bLz-5YhbZmRlhNAg"
        ),
    ),
    Product(
        id="bourbon",
        name="Bourbon",
        origin="Ruanda · Lago Kivu",
        origin_short="RUANDA · LAGO KIVU",
        notes="Ciruela, té negro, caramelo",
        notes_short="Ciruela, té negro, caramelo",
        price=8.0,
        roast="Medio",
        badge_tueste="Tueste medio",
        process="Proceso Lavado",
        altitude="1,600–1,900 msnm",
        variety="Bourbon",
        description=(
            "Un clásico del altiplano ruandés: acidez brillante, cuerpo sedoso y un "
            "final dulce que recuerda a la ciruela madura. Tostado para resaltar sus "
            "notas de té negro."
        ),
        img_home=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBqsDfKh2FbiVePf1ZGaN8qbzFb7d3ey5uTAHeukoOfbG4G1diVt-q25DlAGNxH5tjNo9ezVr6_f33D5RtTn9ROA82m6jgriEi07B8oE_PXJAlHLC0vNem7tTPOEBPhAoIms9644O6L_kESNrjD0BTsiig1n6YbzkOITRIc0Hx3i4tELbStsIVsXJtj07Fqf_D3J-fEgRkVmN7gZoeOG34POnhlDP64cLi21lolp_T4yJBekhApGKTBgA"
        ),
        img_tienda=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDzGf9lZPlklO2i0_6rdUVM11pI53RM4AUIQYWcyBbbtx1mL1O3hSMFT9APY4B6G0FF4QU3aRljqQOv0Xw_Rl7bsyMbAjvFXbqoRNU5hw9dAwERvMWgbMUniGbAxf-sHydtMING9GChDIh8Twp8YP3WEYk_aZp3cI669sLcbjLoi8xJJuXgGCjchy1b1mzl54_NNaJ2QUyO2nX-atVzpLypmHCJqSmxEt1ntPJ7eubb1VD-r_Y2DLsB6w"
        ),
        img_detalle=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDzGf9lZPlklO2i0_6rdUVM11pI53RM4AUIQYWcyBbbtx1mL1O3hSMFT9APY4B6G0FF4QU3aRljqQOv0Xw_Rl7bsyMbAjvFXbqoRNU5hw9dAwERvMWgbMUniGbAxf-sHydtMING9GChDIh8Twp8YP3WEYk_aZp3cI669sLcbjLoi8xJJuXgGCjchy1b1mzl54_NNaJ2QUyO2nX-atVzpLypmHCJqSmxEt1ntPJ7eubb1VD-r_Y2DLsB6w"
        ),
        img_thumb=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDzGf9lZPlklO2i0_6rdUVM11pI53RM4AUIQYWcyBbbtx1mL1O3hSMFT9APY4B6G0FF4QU3aRljqQOv0Xw_Rl7bsyMbAjvFXbqoRNU5hw9dAwERvMWgbMUniGbAxf-sHydtMING9GChDIh8Twp8YP3WEYk_aZp3cI669sLcbjLoi8xJJuXgGCjchy1b1mzl54_NNaJ2QUyO2nX-atVzpLypmHCJqSmxEt1ntPJ7eubb1VD-r_Y2DLsB6w"
        ),
    ),
    Product(
        id="geisha",
        name="Geisha",
        origin="Panamá · Boquete",
        origin_short="PANAMÁ · BOQUETE",
        notes="Jazmín, bergamota, durazno",
        notes_short="Jazmín, bergamota, durazno",
        price=12.0,
        roast="Claro",
        badge_tueste="Tueste claro",
        process="Proceso Lavado",
        altitude="1,600–1,800 msnm",
        variety="Geisha",
        description=(
            "La variedad más célebre del café de especialidad. Perfumada y delicada, "
            "con una acidez cítrica y notas florales que la hacen inconfundible en taza."
        ),
        img_home=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBKV9WgSlekM9bGsmsSuUqGH6zdKf1BNzhDcc32qZ8CD2XDOrTyRMLHLMyM6-Z1gdTFUrSu2qaEKW8MDbkYBm4R-MGelbrWzWwlFoD3uwHcBx4a_rx00qPNzfkXTHMc3wbIUPAMGOwfTQAt3o3mMBl8PcwGD2v5HITt0GyVAcvV8eULfDkUzkYArwIoFsrgB-b894CM2G2jWf_C3l_Iky63IYvvMKmb1TyGsaZpBZWxIOwHf_lANGl6CA"
        ),
        img_tienda=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBW_mM8gUJ07Z49rpVC7JFBqXjesD07h_161rIWKyMbGY6dgP8_htAEDPB7l59yGQWsLPox_QEPMzvlXxMqfN6hEjf-XyhV7U20_bq7wmHnaOGgUqVqF9uONhC-XGW71gBzrXI-osBEIiITgE5YeGEFZdQ1gsK3_5W00IVZ-gOAzNnnAmRmvUs-DoXMo-fhsiKGLDqT86IvkeucIKZhh5PRT0Z7VgFcs0pC_eI3uz-p1dAYa4fG622rxw"
        ),
        img_detalle=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBW_mM8gUJ07Z49rpVC7JFBqXjesD07h_161rIWKyMbGY6dgP8_htAEDPB7l59yGQWsLPox_QEPMzvlXxMqfN6hEjf-XyhV7U20_bq7wmHnaOGgUqVqF9uONhC-XGW71gBzrXI-osBEIiITgE5YeGEFZdQ1gsK3_5W00IVZ-gOAzNnnAmRmvUs-DoXMo-fhsiKGLDqT86IvkeucIKZhh5PRT0Z7VgFcs0pC_eI3uz-p1dAYa4fG622rxw"
        ),
        img_thumb=(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBW_mM8gUJ07Z49rpVC7JFBqXjesD07h_161rIWKyMbGY6dgP8_htAEDPB7l59yGQWsLPox_QEPMzvlXxMqfN6hEjf-XyhV7U20_bq7wmHnaOGgUqVqF9uONhC-XGW71gBzrXI-osBEIiITgE5YeGEFZdQ1gsK3_5W00IVZ-gOAzNnnAmRmvUs-DoXMo-fhsiKGLDqT86IvkeucIKZhh5PRT0Z7VgFcs0pC_eI3uz-p1dAYa4fG622rxw"
        ),
    ),
]

PRODUCTS_BY_ID: dict[str, Product] = {product.id: product for product in PRODUCTS}
