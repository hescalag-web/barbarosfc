const whatsappBase = "https://wa.me/56971075720?text=Hola,%20quiero%saber%20mas%20de%20"

const productos = [
  {
    "nombre": "Mochila Urbana",
    "descripcion": "Mochila B-Light 10l Daypack",
    "marca": "Lippi",
    "precio": "$30.990",
    "imagen": "imagenes/b-light_dayPack.jpg",
    "categorias": ["hiking"],
    "whatsapp": whatsappBase + encodeURIComponent("Mochila%20B-Light%2010lt.%20Daypack%20valor%20$30.990")
  },
  {
    "nombre": "Mochila Urbana",
    "descripcion": "Mochila B-Light 10l Daypack Rosada",
    "marca": "Lippi",
    "precio": "$30.990",
    "imagen": "imagenes/b-light_dayPack_rosada.jpg",
    "categorias": ["hiking"],
    "whatsapp": whatsappBase + encodeURIComponent("Mochila%20B-Light%2010lt.%20Daypack%20rosada%20valor%20$30.990")
  },
  {
    "nombre": "Mochila Hidratación",
    "descripcion": "Mochila Fury 10lt. Azul/Turquesa",
    "marca": "Lippi",
    "precio": "$39.990",
    "imagen": "imagenes/mochila_lippi_fury.jpg",
    "categorias": ["hiking"],
    "whatsapp": whatsappBase + encodeURIComponent("Mochila%20Fury%2010lt.%2020valor%20$39.990")
  },
  {
    "nombre": "Mochila Hidratación",
    "descripcion": "Mochila Fury 10lt. Unisex",
    "marca": "Lippi",
    "precio": "$39.990",
    "imagen": "imagenes/mochila_lippi_fury_amarillo.jpg",
    "categorias": ["hiking"],
    "whatsapp": whatsappBase + encodeURIComponent("Mochila%20Fury%2010lt.%2020valor%20$39.990")
  },
  {
    "nombre": "Mochila Hidratación",
    "descripcion": "Mochila Fury 10lt. Negra",
    "marca": "Lippi",
    "precio": "$39.990",
    "imagen": "imagenes/mochila_lippi_fury_negro.jpg",
    "categorias": ["hiking"],
    "whatsapp": whatsappBase + encodeURIComponent("Mochila%20Fury%2010lt.%2020valor%20$44.990")
  },
  {
    "nombre": "Gorro Juneau",
    "descripcion": "Gorro Juneau verde Unisex",
    "marca": "Outdoor Research",
    "precio": "$19.990",
    "imagen": "imagenes/gorro_juneau_verde.jpg",
    "categorias": ["camping"],
    "whatsapp": whatsappBase + encodeURIComponent("Gorro%20Juneau%20verde%20valor%20$19.990")
  },
  {
    "nombre": "Gorro Outdoor Research",
    "descripcion": "Gorro Juneau Outdoor Research color verde Unisex",
    "precio": "$19.990",
    "imagen": "imagenes/gorro_juneau_verde.jpg",
    "categorias": ["camping"],
    "whatsapp": whatsappBase + encodeURIComponent("Gorro%20Juneau%20verde%20valor%20$19.990")
  }
];
