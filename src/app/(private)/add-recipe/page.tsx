"use client";

import styles from "./addRecipe.module.css";
import Image from "next/image";
import { useState, ChangeEvent, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";

const API_BASE_URL = "https://tasteorama-project-5-backend.onrender.com";

interface IngredientFromDB {
  _id: string;
  name: string;
  desc?: string;
  img?: string;
}

interface CategoryFromDB {
  _id: string;
  name: string;
}

interface SelectedIngredient {
  ingredient: string;
  name: string;
  ingredientAmount: string;
}

const recipeValidationSchema = Yup.object({
  name: Yup.string().max(64, "Max 64 characters").required("Required"),
  decr: Yup.string().max(200, "Max 200 characters").required("Required"),
  cookiesTime: Yup.number().min(1).max(360).required("Required"),
  cals: Yup.number().min(1).max(10000).notRequired(),
  category: Yup.string().required("Required"),
  instruction: Yup.string()
    .max(1200, "Max 1200 characters")
    .required("Required"),
});

export default function AddRecipePage() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [categoriesList, setCategoriesList] = useState<CategoryFromDB[]>([]);
  const [ingredientsList, setIngredientsList] = useState<IngredientFromDB[]>(
    [],
  );

  const [currentIngredientId, setCurrentIngredientId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recipeIngredients, setRecipeIngredients] = useState<
    SelectedIngredient[]
  >([]);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      decr: "",
      cookiesTime: "",
      cals: "",
      category: "",
      instruction: "",
    },
    validationSchema: recipeValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (recipeIngredients.length === 0) {
        setIngredientsError(
          "Please add at least one ingredient to your recipe",
        );
        return;
      }
      setIngredientsError(null);

      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("desc", values.decr);
        formData.append("cookiesTime", values.cookiesTime);
        if (values.cals) {
          formData.append("cals", values.cals);
        }
        formData.append("category", values.category);
        formData.append("instruction", values.instruction);

        const ingredientsForBackend = recipeIngredients.map((item) => ({
          ingredient: item.ingredient,
          ingredientAmount: item.ingredientAmount,
        }));
        formData.append("ingredients", JSON.stringify(ingredientsForBackend));

        if (photoFile) {
          formData.append("recipeImg", photoFile);
        }

        const token = localStorage.getItem("accessToken");

        const response = await fetch(`${API_BASE_URL}/recipes`, {
          method: "POST",
          body: formData,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (response.ok) {
          toast.success("Recipe successfully published!", {
            duration: 4000,
            style: {
              fontFamily: "inherit",
              borderRadius: "8px",
              background: "#d7d5d5",
              color: "#1cbd34",
            },
          });

          resetForm();
          setRecipeIngredients([]);
          setPhotoPreview(null);
          setPhotoFile(null);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to publish recipe");
        }
      } catch (error) {
        console.error("Error submitting recipe:", error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Завантажуємо категорії
        const catRes = await fetch(`${API_BASE_URL}/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategoriesList(catData);
        } else {
          console.error("The categories request failed:", catRes.statusText);
        }

        // 2. Завантажуємо інгредієнти
        const ingRes = await fetch(`${API_BASE_URL}/ingredients`);
        if (ingRes.ok) {
          const ingData = await ingRes.json();
          setIngredientsList(ingData);
        } else {
          console.error("The ingredients request failed:", ingRes.statusText);
        }
      } catch (error) {
        console.error("The backend connection failed:", error);
      }
    };

    fetchData();
  }, []);

  // Логіка кнопки "Add new Ingredient"
  const handleAddIngredient = () => {
    if (!currentIngredientId || !amount.trim()) {
      alert("Please select an ingredient and enter amount.");
      return;
    }

    const trimmedAmount = amount.trim();
    if (trimmedAmount.length < 2 || trimmedAmount.length > 16) {
      alert(
        "Ingredient amount must be between 2 and 16 characters (e.g., '100g').",
      );
      return;
    }

    const isDuplicate = recipeIngredients.some(
      (item) => item.ingredient === currentIngredientId,
    );
    if (isDuplicate) {
      alert("This ingredient is already added!");
      return;
    }

    const found = ingredientsList.find(
      (ing) => ing._id === currentIngredientId,
    );
    if (found) {
      const newIngredient: SelectedIngredient = {
        ingredient: found._id,
        name: found.name,
        ingredientAmount: trimmedAmount,
      };

      setRecipeIngredients([...recipeIngredients, newIngredient]);
      setCurrentIngredientId("");
      setAmount("");

      setIngredientsError(null);
    }
  };

  const handleRemoveIngredient = (idToRemove: string) => {
    setRecipeIngredients(
      recipeIngredients.filter((item) => item.ingredient !== idToRemove),
    );
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size must be less than 2Mb.");
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setPhotoPreview(null);
    setPhotoFile(null);
  };

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;

    target.style.height = "auto";
    target.style.height = `${target.scrollHeight}px`;
  };

  return (
    <main className="container">
      <h1 className={styles.mainTitle}>Add Recipe</h1>
      <form onSubmit={formik.handleSubmit} className={styles.mainForm}>
        {/* ЛІВА ЧАСТИНА МАКEТА */}
        <div className={styles.leftColumn}>
          {/* БЛОК 1: General Information + Category */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>General Information</h2>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Recipe Title</label>
              <input
                type="text"
                name="name"
                placeholder="Enter the name of your recipe"
                className={`${styles.input} ${formik.touched.name && formik.errors.name ? styles.inputError : ""}`}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <p className={styles.errorText}>{formik.errors.name}</p>
              )}
            </div>
            {/* Description */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Recipe Description</label>
              <textarea
                name="decr"
                placeholder="Enter a brief description of your recipe"
                className={`${styles.textarea} ${formik.touched.decr && formik.errors.decr ? styles.inputError : ""}`}
                value={formik.values.decr}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputResize(e);
                }}
                onBlur={formik.handleBlur}
                rows={5}
              />
              {formik.touched.decr && formik.errors.decr && (
                <p className={styles.errorText}>{formik.errors.decr}</p>
              )}
            </div>
            {/* Cooking Time */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>Cooking time in minutes</label>
              <input
                name="cookiesTime"
                type="text"
                placeholder="10"
                className={`${styles.input} ${formik.touched.cookiesTime && formik.errors.cookiesTime ? styles.inputError : ""}`}
                value={formik.values.cookiesTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.cookiesTime && formik.errors.cookiesTime && (
                <p className={styles.errorText}>{formik.errors.cookiesTime}</p>
              )}
            </div>
            <div className={styles.rowGrid}>
              {/* Calories */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Calories</label>
                <input
                  type="text"
                  name="cals"
                  placeholder="150"
                  className={`${styles.input} ${formik.touched.cals && formik.errors.cals ? styles.inputError : ""}`}
                  value={formik.values.cals}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.cals && formik.errors.cals && (
                  <p className={styles.errorText}>{formik.errors.cals}</p>
                )}
              </div>
              {/* Category Select */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>Category</label>
                <select
                  name="category"
                  className={`${styles.select} ${formik.touched.category && formik.errors.category ? styles.inputError : ""}`}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="" disabled hidden>
                    Soup
                  </option>
                  {categoriesList.length > 0 &&
                    categoriesList.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </section>

          {/* БЛОК 2: Ingredients */}
          <section className={`${styles.formSection} ${styles.ingredientsSection}`}>
            <h2 className={styles.sectionTitle}>Ingredients</h2>
            <div className={styles.ingredientscontrolsBlock}>
              <div className={styles.inputsRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Name</label>
                  <select
                    style={{
                      color: currentIngredientId ? "inherit" : "#595d62",
                    }}
                    className={styles.select}
                    value={currentIngredientId || ""}
                    onChange={(e) => setCurrentIngredientId(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Broccoli
                    </option>
                    {ingredientsList.map((ingredient) => (
                      <option key={ingredient._id} value={ingredient._id}>
                        {ingredient.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Amount</label>
                  <input
                    type="text"
                    placeholder="100g"
                    className={styles.input}
                    value={amount || ""}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.addIngredientBtn}
                  onClick={handleAddIngredient}
                >
                  Add new Ingredient
                </button>
              </div>
            </div>
            <div className={styles.listSection}>
              <div className={styles.listHeader}>
                <span className={styles.headerName}>Name:</span>
                <span className={styles.headerAmount}>Amount:</span>
                <span className={styles.headerSpacer}></span>
              </div>
              {recipeIngredients.length > 0 && (
                <ul className={styles.ingredientsList}>
                  {recipeIngredients.map((item) => (
                    <li key={item.ingredient} className={styles.listItem}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemAmount}>
                        {item.ingredientAmount}
                      </span>
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => handleRemoveIngredient(item.ingredient)}
                      >
                        <Image
                          src="/removeIngredient.svg"
                          alt="Remove Ingredient"
                          className={styles.removeIngredientIcon}
                          width={24}
                          height={24}
                          unoptimized
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* БЛОК 3: Instructions */}
          <section
            className={`${styles.formSection} ${styles.instructionsSection}`}
          >
            <h2 className={styles.sectionTitle}>Instructions</h2>
            <div className={styles.inputGroup}>
              <textarea
                name="instruction"
                placeholder="Enter a text"
                className={`${styles.textarea} ${formik.touched.instruction && formik.errors.instruction ? styles.inputError : ""}`}
                value={formik.values.instruction}
                onChange={(e) => {
                  formik.handleChange(e);
                  handleInputResize(e);
                }}
                onBlur={formik.handleBlur}
                rows={5}
              />
              {formik.touched.instruction && formik.errors.instruction && (
                <p className={styles.errorText}>{formik.errors.instruction}</p>
              )}
            </div>
          </section>
          {ingredientsError && (
            <p className={styles.errorText}>{ingredientsError}</p>
          )}
          <button type="submit" className={styles.publishBtn}>
            Publish Recipe
          </button>
        </div>
        {/* ПРАВА ЧАСТИНА МАКЕТА (Upload Photo) */}
        <section className={`${styles.formSection} ${styles.rightColumn}`}>
          <h2 className={styles.sectionTitle}>Upload Photo</h2>
          <div className={styles.dropzone}>
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              className={styles.hiddenInput}
              onChange={handlePhotoChange}
            />
            {photoPreview ? (
              <div className={styles.previewContainer}>
                <button
                  type="button"
                  className={styles.deletePhotoBtn}
                  onClick={handleRemovePhoto}
                >
                  <Image
                    src="/deletePhoto.svg"
                    alt="Delete Photo"
                    className={styles.deletePhotoIcon}
                    width={32}
                    height={32}
                    unoptimized
                  />
                </button>
                <label htmlFor="photo-upload" className={styles.previewLabel}>
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    className={styles.previewImage}
                    fill
                    sizes="391px"
                    unoptimized
                  />
                </label>
              </div>
            ) : (
              <label htmlFor="photo-upload" className={styles.dropzoneLabel}>
                <Image
                  src="/camera.svg"
                  alt="Camera Icon"
                  className={styles.iconCamera}
                  width={162}
                  height={136}
                  unoptimized
                />
              </label>
            )}
          </div>
        </section>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
